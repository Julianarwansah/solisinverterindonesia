<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('per_page', 12);

        $query = Product::where('status', 'published');

        if ($request->has('category')) {
            $slug = $request->input('category');
            $category = Category::where('slug', $slug)->first();

            if ($category) {
                // Get this category and all its descendants
                $categoryIds = $this->getAllCategoryIds($category);
                $query->whereIn('category_id', $categoryIds);
            }
        }

        $products = $query->latest()->paginate($limit);

        return response()->json($products);
    }

    private function getAllCategoryIds($category)
    {
        $ids = collect([$category->id]);

        foreach ($category->subcategories as $sub) {
            $ids = $ids->merge($this->getAllCategoryIds($sub));
        }

        return $ids;
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->where('status', 'published')->firstOrFail();
        return response()->json($product);
    }

    public function categories()
    {
        return response()->json(Category::all());
    }

    public function showCategory($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        return response()->json($category);
    }
}
