<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Allowlist::create([
            'email' => 'admin@gmail.com',
        ]);
        \App\Models\User::create([
            'full_name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'Owner',
        ]);

        $this->call([
            CategorySeeder::class,
            MealSeeder::class,
        ]);
    }
}
