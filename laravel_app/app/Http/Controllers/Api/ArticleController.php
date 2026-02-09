<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('per_page', 9);
        $articles = Article::where('status', 'published')->latest()->paginate($limit);
        return response()->json($articles);
    }

    public function show($slug)
    {
        $article = Article::where('slug', $slug)->where('status', 'published')->firstOrFail();
        return response()->json($article);
    }
}
