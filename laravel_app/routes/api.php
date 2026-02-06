<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('products')->group(function () {
    Route::get('/', [App\Http\Controllers\ProductController::class, 'apiIndex']);
    Route::get('/categories', [App\Http\Controllers\ProductController::class, 'apiCategories']);
    Route::get('/category/{slug}', [App\Http\Controllers\ProductController::class, 'apiCategory']);
    Route::get('/{slug}', [App\Http\Controllers\ProductController::class, 'apiShow']);
});

Route::prefix('articles')->group(function () {
    Route::get('/', [App\Http\Controllers\ArticleController::class, 'apiIndex']);
    Route::get('/{slug}', [App\Http\Controllers\ArticleController::class, 'apiShow']);
});
