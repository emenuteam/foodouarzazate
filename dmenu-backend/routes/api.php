<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AllowlistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\SaladController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SliderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// allow list routes
Route::post('/allowlist/add', [AllowlistController::class, 'addEmailToAllowlist']);
Route::get('/allowlist', [AllowlistController::class, 'getAllowlist']);
Route::post('/allowlist/delete', [AllowlistController::class, 'deleteEmailFromAllowlist']);

// auth routes
Route::get('/user/{token}', [AuthController::class, 'getUser']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::put('/user/{token}', [AuthController::class, 'updateUser']);
Route::post('/user/reset-password/{token}', [AuthController::class, 'resetPassword']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

// category routes
Route::post('/categories', [CategoryController::class, 'createCategory']);
Route::get('/categories', [CategoryController::class, 'getCategories']);
Route::get('/categories/{id}', [CategoryController::class, 'getCategory']);
Route::put('/categories/{id}', [CategoryController::class, 'updateCategory']);
Route::delete('/categories/{id}', [CategoryController::class, 'deleteCategory']);

// dashboard routes
Route::get('/dashboard', [DashboardController::class, 'getDashInfo']);


// meal routes
Route::post('/meals', [MealController::class, 'createMeal']);
Route::get('/meals', [MealController::class, 'getAllMeals']);
Route::get('/meal/{id}', [MealController::class, 'getMealById']);
Route::post('/meals/{id}', [MealController::class, 'updateMeal']);
Route::patch('/meals/{id}/availability', [MealController::class, 'updateMealAvailability']);
Route::delete('/meals/{id}', [MealController::class, 'deleteMeal']);
Route::get('/allmeals', [MealController::class, 'index']);
