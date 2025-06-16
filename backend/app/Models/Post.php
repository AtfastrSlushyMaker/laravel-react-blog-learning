<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'content',
        'status',
        'user_id',
    ];
    protected $casts = [
        'status' =>PostStatus::class,
    ];
public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
