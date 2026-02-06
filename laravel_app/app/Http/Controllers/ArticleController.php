<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::where('status', 'published')->latest()->paginate(9);
        return view('articles.index', compact('articles'));
    }

    public function show($slug)
    {
        $article = Article::where('slug', $slug)->where('status', 'published')->firstOrFail();
        $recentArticles = Article::where('id', '!=', $article->id)
            ->where('status', 'published')
            ->latest()
            ->limit(3)
            ->get();

        return view('articles.show', compact('article', 'recentArticles'));
    }

    // API Methods
    public function apiIndex()
    {
        $articles = Article::where('status', 'published')->latest()->get();
        return response()->json($articles);
    }

    public function apiShow($slug)
    {
        $article = Article::where('slug', $slug)->where('status', 'published')->firstOrFail();
        return response()->json($article);
    }
}
