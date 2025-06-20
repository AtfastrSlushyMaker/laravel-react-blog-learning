<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user=User::with('posts')->latest()->get();
        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ValidatedData=$request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
            ]
            );
        $ValidatedData['password'] = bcrypt($ValidatedData['password']);
        $user = User::create($ValidatedData);
        return response()->json($user, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user=User::with('posts')->findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user=User::findOrFail($id);
        if ($user->isBanned())
        {
            return response()->json(['message' => 'User is banned'], Response::HTTP_FORBIDDEN);
        }
        $ValidatedData=$request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password' => 'required|string|min:8',
            ]
            );
        $ValidatedData['password'] = bcrypt($ValidatedData['password']);
        $user->update($ValidatedData);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user=User::findOrFail($id);
        if ($user->isBanned())
        {
            return response()->json(['message' => 'User is banned'], Response::HTTP_FORBIDDEN);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], Response::HTTP_NO_CONTENT);
    }

    public function get_current_user(): JsonResponse
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
        return response()->json($user, Response::HTTP_OK);
    }
}
