<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$products = \App\Models\Product::where('status', 'published')->limit(6)->get();
foreach ($products as $p) {
    $imgStatus = empty($p->images) ? 'NO IMAGE IN DB' : 'OK (' . $p->images[0] . ')';
    if (!empty($p->images)) {
        if (!file_exists(public_path($p->images[0]))) {
            $imgStatus = 'FILE MISSING ON DISK (' . public_path($p->images[0]) . ')';
        }
    }
    echo "Product: {$p->name} | Image: {$imgStatus}" . PHP_EOL;
}
