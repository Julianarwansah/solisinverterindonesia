<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'name',
        'slug',
        'description',
        'short_description',
        'category_id',
        'images',
        'tags',
        'meta_title',
        'meta_description',
        'keywords',
    ];

    protected $casts = [
        'images' => 'array',
        'tags' => 'array',
        'keywords' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
