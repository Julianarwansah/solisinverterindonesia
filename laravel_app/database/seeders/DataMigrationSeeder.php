<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class DataMigrationSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Migrate Categories
        if (Schema::hasTable('product_categories')) {
            $directusCategories = DB::table('product_categories')->get();
            foreach ($directusCategories as $item) {
                DB::table('categories')->updateOrInsert(
                    ['id' => $item->id],
                    [
                        'name' => $item->name,
                        'slug' => $item->slug ?? Str::slug($item->name),
                        'description' => $item->description,
                        'parent_id' => $item->parent_category,
                        'display_type' => 'grid',
                        'thumbnail' => $this->mapImage($item->thumbnail),
                        'seo_title' => $item->seo_title,
                        'seo_description' => $item->seo_description,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
            $this->command->info('Categories migrated!');
        }

        // 2. Migrate Articles
        if (Schema::hasTable('directus_articles')) {
            $directusArticles = DB::table('directus_articles')->get();
            foreach ($directusArticles as $item) {
                // Check if this is a Directus record (usually ID is UUID or Int)
                DB::table('articles')->updateOrInsert(
                    ['slug' => $item->slug],
                    [
                        'status' => $item->status ?? 'published',
                        'title' => $item->title,
                        'content' => $item->content,
                        'excerpt' => $item->excerpt,
                        'featured_image' => $this->mapImage($item->featured_image),
                        'tags' => is_string($item->tags) ? $item->tags : json_encode($item->tags),
                        'seo_title' => $item->seo_title,
                        'seo_description' => $item->seo_description,
                        'canonical_url' => $item->canonical_url,
                        'og_image' => $this->mapImage($item->og_image),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
            $this->command->info('Articles migrated!');
        }

        // 3. Migrate Products
        if (Schema::hasTable('product_categories') && Schema::hasTable('directus_products')) {
            $directusProducts = DB::table('directus_products')->get();
            foreach ($directusProducts as $item) {
                // Get gallery images from products_files
                $gallery = [];
                // Main image first
                if ($item->image) {
                    $mainPath = $this->mapImage($item->image);
                    if ($mainPath)
                        $gallery[] = $mainPath;
                }

                if (Schema::hasTable('products_files')) {
                    $fileIds = DB::table('products_files')
                        ->where('products_id', $item->id)
                        ->pluck('directus_files_id');

                    foreach ($fileIds as $fId) {
                        $path = $this->mapImage($fId);
                        if ($path)
                            $gallery[] = $path;
                    }
                }

                DB::table('products')->updateOrInsert(
                    ['slug' => $item->slug],
                    [
                        'status' => $item->status ?? 'published',
                        'name' => $item->name,
                        'description' => $item->description,
                        'short_description' => Str::limit(strip_tags($item->description), 160),
                        'category_id' => $item->category,
                        'images' => json_encode($gallery),
                        'meta_title' => $item->meta_title ?: ($item->name . ' - Solis Inverter'),
                        'meta_description' => $item->meta_description ?: Str::limit(strip_tags($item->description), 160),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
            $this->command->info('Products migrated!');
        }
    }

    private function mapImage($fileId)
    {
        if (!$fileId)
            return null;

        if (Schema::hasTable('directus_files')) {
            $file = DB::table('directus_files')->where('id', $fileId)->first();
            if ($file) {
                return 'images/' . $file->filename_disk;
            }
        }

        return null;
    }
}
