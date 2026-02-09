<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Product;

echo "Total Products: " . Product::count() . "\n";
echo "Published Products: " . Product::where('status', 'published')->count() . "\n";
$stats = Product::select('status', \DB::raw('count(*) as count'))->groupBy('status')->get();
foreach ($stats as $s) {
    echo "Status '{$s->status}': {$s->count}\n";
}
