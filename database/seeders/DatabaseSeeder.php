<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Problem;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Problem::create([
            'title' => '解二次方程式',
            'description' => '求解 ax² + bx + c = 0',
            'difficulty' => 3
        ]);
    
        Problem::create([
            'title' => '計算圓面積',
            'description' => '給定半徑 r，求圓的面積。',
            'difficulty' => 2
        ]);
    }
}
