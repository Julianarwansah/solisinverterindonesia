<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$categories = \App\Models\Category::all();
foreach ($categories as $c) {
    echo "ID: {$c->id} | Name: {$c->name} | Thumbnail: " . ($c->thumbnail ?: 'NULL') . PHP_EOL;
}
