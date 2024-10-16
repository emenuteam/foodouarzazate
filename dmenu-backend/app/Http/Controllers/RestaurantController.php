<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    /**
     * Get all restaurants.
     *
     * @return JsonResponse
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            $restaurants = Restaurant::all();
            return response()->json($restaurants);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Upsert (create or update) a restaurant.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function upsertRestaurant(Request $request): JsonResponse
    {
        // dd($request->all());
        $request->validate([
            'physical_address' => 'nullable|string|max:255',
            'email_address' => 'nullable|email|max:255',
            'fax_phone' => 'nullable|string|max:20',
            'instagram_link' => 'nullable|url|max:255',
            'facebook_link' => 'nullable|url|max:255',
            'websiteLogo' => 'nullable|image',
            'bg_image' => 'nullable|image',
            'restaurant_name' => 'nullable|string|max:255',
            'subheading' => 'nullable|string|max:255',
            // 'server'=> 'nullable|string|max:20',
            // 'facture'=> 'nullable|string|max:20',
        ]);

        try {
            // Extract request data except the logo
            $restaurantData = $request->except('websiteLogo');

            // Retrieve the first restaurant (if it exists)
            $restaurant = Restaurant::first();

            // Handle file upload for the logo
            if ($request->hasFile('websiteLogo')) {
                if ($restaurant && $restaurant->website_logo) {
                    // Delete the old logo if it exists
                    Storage::delete('public/' . $restaurant->website_logo);
                }
                // Store the new logo
                $restaurantData['website_logo'] = $request->file('websiteLogo')->store('restaurant_logos', 'public');
            }
            if($request->hasFile('bg_image')){
                if ($restaurant && $restaurant->bg_image) {
                    // Delete the old logo if it exists
                    Storage::delete('public/' . $restaurant->bg_image);
                }
                // Store the new logo
                $restaurantData['bg_image'] = $request->file('bg_image')->store('restaurant_logos', 'public');
            }

            // If a restaurant exists, update it; otherwise, create a new one
            if ($restaurant) {
                $restaurant->update($restaurantData);
                $message = 'Restaurant updated successfully!';
            } else {
                $restaurant = Restaurant::create($restaurantData);
                $message = 'Restaurant created successfully!';
            }

            return response()->json(['message' => $message, 'restaurant' => $restaurant], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
