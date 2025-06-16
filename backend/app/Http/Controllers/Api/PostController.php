<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Enums\PostStatus;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     // get /posts
    public function index(): JsonResponse
    {
        $posts = Post::with('user')->latest()
            ->where('status', PostStatus::PUBLISHED)
            ->get();
        return response()->json($posts);
    }
    /**
     * Display a listing of the user's posts.
     */
    // get /posts/my-posts
    public function myPosts(): JsonResponse
    {
         if (!auth()->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
        }
        $posts = Post::with('user')->latest()
            ->where('user_id', auth()->id())
            ->where('status', '!=', PostStatus::DELETED)
            ->get();
        return response()->json($posts);
    }


    /**
     * Store a newly created resource in storage.
     */
    // post /posts
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:10000',
            'status' => 'required|string|in:draft,published,archived',
            'user_id' => 'required|exists:users,id',
        ]);
        
        $post = Post::create($validatedData);
        return response()->json($post, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    // get /posts/{id}
    public function show(string $id)
    {
        $post=Post::with('user')->findOrFail($id);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        $validatedData = $request->validate(
            [
                'title' => 'required|string|max:255',
                'content' => 'required|string|max:10000',
                'status' => ['required', Rule::enum(PostStatus::class)],
            ]
        );
        $post->update($validatedData);
        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        // Soft delete the post
        $post->status = PostStatus::DELETED;
        $post->save();
        return response()->json(['message' => 'Post deleted successfully'], Response::HTTP_NO_CONTENT);
    }
}
