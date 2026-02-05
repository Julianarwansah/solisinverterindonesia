<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'tags',
        'seo_title',
        'seo_description',
        'canonical_url',
        'og_image',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}
