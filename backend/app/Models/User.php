<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'status' => 'boolean',
    ];

    /**
     * Check if user is banned
     */
    public function isBanned(): bool
    {
        return $this->status === true;
    }

    /**
     * Ban this user (admin only)
     */
    public function ban(): void
    {
        $this->update(['status' => true]);
    }

    /**
     * Unban this user (admin only)
     */
    public function unban(): void
    {
        $this->update(['status' => false]);
    }

    /**
     * Get all posts for this user
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
