<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('status', 'published');

        if ($request->has('category')) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        $products = $query->latest()->paginate(12);
        $categories = Category::all();

        return view('products.index', compact('products', 'categories'));
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->where('status', 'published')->firstOrFail();
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return view('products.show', compact('product', 'relatedProducts'));
    }

    public function category($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $products = Product::where('category_id', $category->id)
            ->where('status', 'published')
            ->paginate(12);

        $categories = Category::all();

        return view('products.index', compact('products', 'categories', 'category'));
    }

    // API Methods
    public function apiIndex(Request $request)
    {
        $query = Product::with('category')->where('status', 'published');

        if ($request->has('limit')) {
            $products = $query->limit($request->limit)->get();
        } else {
            $products = $query->get();
        }

        return response()->json($products);
    }

    public function apiShow($slug)
    {
        $product = Product::with('category')->where('slug', $slug)->where('status', 'published')->firstOrFail();
        return response()->json($product);
    }

    public function apiCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function apiCategory($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $products = Product::where('category_id', $category->id)->where('status', 'published')->get();
        return response()->json([
            'category' => $category,
            'products' => $products
        ]);
    }
}
