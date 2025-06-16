<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
//API

// Posts
//GET
Route::get('/posts', [App\Http\Controllers\Api\PostController::class, 'index']);
Route::get('/posts/my-posts', [App\Http\Controllers\Api\PostController::class, 'myPosts']);
Route::get('/posts/{post}', [App\Http\Controllers\Api\PostController::class, 'show']);

//POST
Route::post('/posts', [App\Http\Controllers\Api\PostController::class, 'store']);
//PUT
Route::put('/posts/{post}', [App\Http\Controllers\Api\PostController::class, 'update']);
//DELETE
Route::delete('/posts/{post}', [App\Http\Controllers\Api\PostController::class, 'destroy']);

//-----------------------------