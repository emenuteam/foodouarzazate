<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Allowlist;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AllowlistController extends Controller
{
    /**
     * Add an email to the allowlist.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addEmailToAllowlist(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $email = $request->input('email');

            $newEntry = Allowlist::create(['email' => $email]);

            return response()->json([
                'message' => 'Email added to allowlist',
                'entry' => $newEntry
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all emails from the allowlist.
     *
     * @return JsonResponse
     */
    public function getAllowlist(): JsonResponse
    {
        try {
            $emails = Allowlist::all();

            if ($emails->isNotEmpty()) {
                return response()->json(['emails' => $emails]);
            } else {
                return response()->json(['message' => 'No emails found in allowlist'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete an email from the allowlist.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteEmailFromAllowlist(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        try {
            $email = $request->input('email');

            $emailEntry = Allowlist::where('email', $email)->first();

            if (!$emailEntry) {
                return response()->json(['error' => 'Email not found in allowlist'], 404);
            }

            $emailEntry->delete();

            $user = User::where('email', $email)->first();
            if ($user) {
                $user->delete();
            }

            return response()->json(['message' => 'Email removed from allowlist']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
