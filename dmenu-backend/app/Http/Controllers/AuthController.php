<?php

namespace App\Http\Controllers;
use App\Mail\PasswordReset;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Allowlist;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Get a user by token.
     *
     * @param string $token
     * @return JsonResponse
     */
    public function getUser($token): JsonResponse
    {
        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    }

    /**
     * Register a new user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8'
        ]);

        try {
            if ('Employee' === 'Employee') {
                $allowedEmail = Allowlist::where('email', $validated['email'])->first();
                if (!$allowedEmail) {
                    return response()->json(['error' => 'Email not in allowlist'], 403);
                }
            }

            $user = User::create([
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' =>'Employee',
                'token' => Str::random(60), // Generate a random token for simplicity
            ]);

            return response()->json(['message' => 'User registered successfully', 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Login a user and return a token.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['error' => 'Invalid password/email'], 401);
        }

        $token = Str::random(60); // Generate a random token for simplicity
        $user->token = $token;
        $user->save();

        return response()->json(['token' => $token]);
    }

    /**
     * Update user details.
     *
     * @param Request $request
     * @param string $token
     * @return JsonResponse
     */
    public function updateUser(Request $request, $token): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'string',
            'email' => 'email'
        ]);

        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $originalEmail = $user->email;

        $user->full_name = $validated['full_name'];
        $user->email = $validated['email'];
        $user->save();

        Allowlist::where('email', $originalEmail)->update(['email' => $validated['email']]);

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    /**
     * Reset user password.
     *
     * @param Request $request
     * @param string $token
     * @return JsonResponse
     */
    public function resetPassword(Request $request, $token): JsonResponse
    {
        $validated = $request->validate([
            'newPassword' => 'required|string|min:6'
        ]);

        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->password = Hash::make($validated['newPassword']);
        $user->save();

        return response()->json(['message' => 'Password reset successfully']);
    }

    /**
     * Send a password reset email.
     *
     * @param Request $request
     * @return JsonResponse
     */

     public function forgotPassword(Request $request)
     {
         // Validate the email
         $request->validate([
             'email' => 'required|email',
         ]);

         // Check if the user exists
         $user = User::where('email', $request->email)->first();

         if (!$user) {
             return response()->json(['message' => 'Email does not exist'], 404);
         }

         // Generate a new password
         $newPassword = Str::random(10);

         // Update the user's password in the database
         $user->password = Hash::make($newPassword);
         $user->save();

         // Send the new password via email
        //  Mail::raw("Your new password is: $newPassword", function ($message) use ($user) {
        //      $message->to($user->email)
        //              ->subject('Your New Password');
        //  });
        $details = [
            'subject' => 'Your New Password',
            'body' => "Your new password is: $newPassword",
        ];


        try {
            // Mail::to(env('MAIL_USERNAME'))->send(new ContactMail());
            Mail::to($request->email)->send(new PasswordReset($details));
            return response()->json(['message' => 'A new password has been sent to your email']);

        } catch (\Exception $e) {
            // Log the error
            // Log::error('Failed to send message: ' . $e->getMessage(), [
            //     'exception' => $e,
            //     'request' => $request->all(),
            // ]);
            return response()->json(['error' => 'Failed to send message'.$e->getMessage()], 500);
        }
     }
}
