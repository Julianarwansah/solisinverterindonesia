<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$products = \App\Models\Product::all();
echo "Total Products: " . $products->count() . PHP_EOL;

$missingCount = 0;
$noImgCount = 0;

foreach ($products as $p) {
    if (empty($p->images)) {
        $noImgCount++;
        echo "Product ID {$p->id} ({$p->name}) has NO images." . PHP_EOL;
    } else {
        $found = false;
        foreach ($p->images as $img) {
            $path = public_path($img);
            if (file_exists($path)) {
                $found = true;
                break;
            }
        }
        if (!$found) {
            $missingCount++;
            echo "Product ID {$p->id} ({$p->name}) has MISSING files. Sample: " . public_path($p->images[0]) . PHP_EOL;
        }
    }
}

echo "Summary:" . PHP_EOL;
echo "No images: $noImgCount" . PHP_EOL;
echo "Missing files: $missingCount" . PHP_EOL;
echo "OK: " . ($products->count() - $noImgCount - $missingCount) . PHP_EOL;
