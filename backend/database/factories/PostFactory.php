<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use App\Models\User;
use App\Enums\PostStatus;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(6), // "Lorem ipsum dolor sit amet consectetur"
            'content' => fake()->paragraphs(3, true), // 3 paragraphs of text
            'status' => fake()->randomElement([
                PostStatus::DRAFT->value,
                PostStatus::PUBLISHED->value,
                PostStatus::ARCHIVED->value,
                PostStatus::DELETED->value
            ]),
            'user_id' => User::factory(), // Creates a user if none exists
        ];
    }
}
