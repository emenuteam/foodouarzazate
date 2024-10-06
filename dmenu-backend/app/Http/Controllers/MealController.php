<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meal;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
// use Illuminate\Support\Facades\Log;

class MealController extends Controller
{
    /**
     * Create a new meal.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createMeal(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|max:2048',
            'type'=> 'required|string'
        ]);

        try {
            $imagePath = $request->file('image')->store('uploads', 'public');
            // Log the image path to check it
            // Log::info('Image path: ' . $imagePath);

            $meal = Meal::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'image_url' => $imagePath,
                'category_id' => $request->input('category_id'),
                'type' => $request->input('type')
            ]);

            return response()->json([
                'message' => 'Meal created successfully',
                'meal' => $meal,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating meal', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all meals with category details.
     *
     * @return JsonResponse
     */
    public function getAllMeals(): JsonResponse
    {
        try {
            $meals = Meal::with('category')->orderBy('created_at', 'desc')->get();
            return response()->json($meals);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        // Fetch all meals with their associated category
        $meals = Meal::with('category')->get()->map(function ($meal) {
            return [
                'name' => $meal->name,
                'price' => $meal->price,
                'category' => $meal->category->name,
                'image' => $meal->image_url,
                'availability' => $meal->availability,
            ];
        });

        return response()->json($meals);
    }

    // New method to get a single meal by ID
    public function getMealById($id): JsonResponse
    {
        try {
            $meal = Meal::with('category')->findOrFail($id);
            return response()->json($meal);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update a specific meal by ID.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateMeal(Request $request, $id): JsonResponse
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'type'=> 'required|string'

        ]);

        try {
            $meal = Meal::find($id);
            if (!$meal) {
                return response()->json(['message' => 'Meal not found'], 404);
            }

            $updateData = $request->only(['name', 'description', 'price', 'category_id']);

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($meal->image_url) {
                    Storage::disk('public')->delete($meal->image_url);
                }
                $updateData['image_url'] = $request->file('image')->store('uploads', 'public');
            }

            $meal->update($updateData);
            return response()->json([
                'message' => 'Meal updated successfully',
                'meal' => $meal,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating meal', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Toggle meal availability.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function updateMealAvailability($id): JsonResponse
    {
        try {
            $meal = Meal::find($id);
            if (!$meal) {
                return response()->json(['message' => 'Meal not found'], 404);
            }

            $meal->availability = !$meal->availability;
            $meal->save();
            return response()->json(['message' => 'Meal availability updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete a meal by ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deleteMeal($id): JsonResponse
    {
        try {
            $meal = Meal::find($id);
            if (!$meal) {
                return response()->json(['message' => 'Meal not found'], 404);
            }

            if ($meal->image_url) {
                Storage::disk('public')->delete($meal->image_url);
            }

            $meal->delete();
            return response()->json(['message' => 'Meal deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
