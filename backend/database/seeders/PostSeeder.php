<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use App\Enums\PostStatus;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 3 users first
        $users = User::factory()->count(3)->create();

        // Create 10 posts, randomly assigning to users
        Post::factory()
            ->count(10)
            ->create([
                'user_id' => fake()->randomElement($users->pluck('id'))
            ]);
    }
}
