<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meal;
use App\Models\Category;

class MealSeeder extends Seeder
{
    public function run()
    {
        $meals = [
            // Category 1: Shawarma
            ['name' => 'Shawarma Plate', 'price' => 45.00, 'image_url' => 'shawarma_plate.jpg', 'category_id' => 1, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Shawarma Sandwich', 'price' => 30.00, 'image_url' => 'shawarma_sandwich.jpg', 'category_id' => 1, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Shawarma Wrap', 'price' => 25.00, 'image_url' => 'shawarma_wrap.jpg', 'category_id' => 1, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Shawarma Salad', 'price' => 35.00, 'image_url' => 'shawarma_salad.jpg', 'category_id' => 1, 'availability' => true, 'type' => 'meal'],

            // Category 2: Tacos
            ['name' => 'Chicken Tacos', 'price' => 35.00, 'image_url' => 'chicken_tacos.jpg', 'category_id' => 2, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Beef Tacos', 'price' => 40.00, 'image_url' => 'beef_tacos.jpg', 'category_id' => 2, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Veggie Tacos', 'price' => 30.00, 'image_url' => 'veggie_tacos.jpg', 'category_id' => 2, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Cheesy Tacos', 'price' => 38.00, 'image_url' => 'cheesy_tacos.jpg', 'category_id' => 2, 'availability' => true, 'type' => 'meal'],

            // Category 4: Burger
            ['name' => 'Beef Burger', 'price' => 50.00, 'image_url' => 'beef_burger.jpg', 'category_id' => 4, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Chicken Burger', 'price' => 45.00, 'image_url' => 'chicken_burger.jpg', 'category_id' => 4, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Veggie Burger', 'price' => 40.00, 'image_url' => 'veggie_burger.jpg', 'category_id' => 4, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Double Beef Burger', 'price' => 60.00, 'image_url' => 'double_beef_burger.jpg', 'category_id' => 4, 'availability' => true, 'type' => 'meal'],

            // Category 6: Burrito
            ['name' => 'Burrito XL', 'price' => 55.00, 'image_url' => 'burrito_xl.jpg', 'category_id' => 6, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Chicken Burrito', 'price' => 45.00, 'image_url' => 'chicken_burrito.jpg', 'category_id' => 6, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Beef Burrito', 'price' => 50.00, 'image_url' => 'beef_burrito.jpg', 'category_id' => 6, 'availability' => true, 'type' => 'meal'],
            ['name' => 'Veggie Burrito', 'price' => 40.00, 'image_url' => 'veggie_burrito.jpg', 'category_id' => 6, 'availability' => true, 'type' => 'meal'],

            // Category 7: Nuggets
            ['name' => 'Chicken Nuggets', 'price' => 20.00, 'image_url' => 'chicken_nuggets.jpg', 'category_id' => 7, 'availability' => true, 'type' => 'snack'],
            ['name' => 'Spicy Nuggets', 'price' => 22.00, 'image_url' => 'spicy_nuggets.jpg', 'category_id' => 7, 'availability' => true, 'type' => 'snack'],
            ['name' => 'Cheesy Nuggets', 'price' => 25.00, 'image_url' => 'cheesy_nuggets.jpg', 'category_id' => 7, 'availability' => true, 'type' => 'snack'],

            // Category 8: Beverage
            ['name' => 'Coca Cola', 'price' => 10.00, 'image_url' => 'coca_cola.jpg', 'category_id' => 8, 'availability' => true, 'type' => 'beverage'],
            ['name' => 'Pepsi', 'price' => 10.00, 'image_url' => 'pepsi.jpg', 'category_id' => 8, 'availability' => true, 'type' => 'beverage'],
            ['name' => 'Orange Juice', 'price' => 15.00, 'image_url' => 'orange_juice.jpg', 'category_id' => 8, 'availability' => true, 'type' => 'beverage'],
            ['name' => 'Lemonade', 'price' => 15.00, 'image_url' => 'lemonade.jpg', 'category_id' => 8, 'availability' => true, 'type' => 'beverage'],
        ];

        foreach ($meals as $item) {
            Meal::create([
                'name' => $item['name'],
                'price' => $item['price'],
                'image_url' => $item['image_url'],
                'category_id' => $item['category_id'],
                'type' => 'meal', // you can customize this field according to your need
            ]);
        }
    }
}
