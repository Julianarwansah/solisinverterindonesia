<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::whereNull('parent_id')->get();
        $featuredProducts = Product::where('status', 'published')->limit(6)->get();

        return view('index', compact('categories', 'featuredProducts'));
    }
}
