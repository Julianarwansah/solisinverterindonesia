const http = require('http');

async function benchmark(label, url) {
    const start = Date.now();
    return new Promise((resolve) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const end = Date.now();
                console.log(`${label}: ${end - start}ms`);
                resolve();
            });
        }).on('error', (e) => {
            console.error(`${label} Error: ${e.message}`);
            resolve();
        });
    });
}

async function run() {
    console.log('Starting benchmarks...');
    await benchmark('Products (12)', 'http://127.0.0.1:8000/api/products?page=1&per_page=12');
    await benchmark('Categories', 'http://127.0.0.1:8000/api/categories');
    await benchmark('Product Detail', 'http://127.0.0.1:8000/api/products/s1-w4g-st');
    console.log('Finished.');
}

run();
