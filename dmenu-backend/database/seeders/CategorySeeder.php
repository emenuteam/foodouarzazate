<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'shawarma', 'description' => null],
            ['name' => 'tacos', 'description' => null],
            ['name' => 'tacos_xl', 'description' => null],
            ['name' => 'burger', 'description' => null],
            ['name' => 'burrito', 'description' => null],
            ['name' => 'burrito_xl', 'description' => null],
            ['name' => 'nugget', 'description' => null],
            ['name' => 'beverage', 'description' => null],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
