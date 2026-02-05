<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\ArticleController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('produk')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/kategori/{slug}', [ProductController::class, 'category'])->name('products.category');
    Route::get('/{slug}', [ProductController::class, 'show'])->name('products.show');
});

Route::prefix('artikel')->group(function () {
    Route::get('/', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/{slug}', [ArticleController::class, 'show'])->name('articles.show');
});

Route::get('/tentang-kami', function () {
    return view('pages.about');
})->name('about');

Route::get('/kontak', function () {
    return view('pages.contact');
})->name('contact');
