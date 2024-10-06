<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meal;
use App\Models\Category;

class MealSeeder extends Seeder
{
    public function run()
    {
        $menu = [
            ['name' => 'Shawarma Normal', 'price' => 25, 'category' => 'shawarma', 'image_url' => '1.jpg'],
            ['name' => 'Shawarma Fromage', 'price' => 30, 'category' => 'shawarma', 'image_url' => '2.jpg'],
            ['name' => 'Tacos Shawarma', 'price' => 35, 'category' => 'shawarma', 'image_url' => '3.jpg'],
            // Add all your menu items here...
            ['name' => 'Pepsi', 'price' => 5, 'category' => 'beverage', 'image_url' => '1.jpg'],
            ['name' => '7up', 'price' => 5, 'category' => 'beverage', 'image_url' => '2.webp'],
        ];

        foreach ($menu as $item) {
            $category = Category::where('name', $item['category'])->first();
            Meal::create([
                'name' => $item['name'],
                'price' => $item['price'],
                'image_url' => $item['image_url'],
                'category_id' => $category->id,
                'availability' => true,  // or any default value
                'type' => 'food', // you can customize this field according to your need
            ]);
        }
    }
}
