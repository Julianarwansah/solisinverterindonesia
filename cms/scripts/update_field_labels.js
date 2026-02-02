const http = require('http');

const HOST = '127.0.0.1';
const PORT = 8055;
const ACCESS_TOKEN = 'static-admin-token-12345';

function request(method, path, body = null) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        };

        const postData = body ? JSON.stringify(body) : '';
        if (body) headers['Content-Length'] = Buffer.byteLength(postData);

        const options = {
            hostname: HOST,
            port: PORT,
            path: path,
            method: method,
            headers: headers
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(data ? JSON.parse(data) : {});
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`Request failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (body) req.write(postData);
        req.end();
    });
}

async function updateLabels() {
    console.log('Updating field labels...\n');

    try {
        // Update field "image" (gambar utama)
        console.log('1. Updating "image" field label...');
        await request('PATCH', '/fields/products/image', {
            meta: {
                note: 'Gambar utama produk yang akan muncul di katalog'
            }
        });
        console.log('✓ Updated "image" field');

        // Update field "images" (galeri)
        console.log('2. Updating "images" field label...');
        await request('PATCH', '/fields/products/images', {
            meta: {
                note: 'Galeri foto produk (bisa upload banyak gambar)'
            }
        });
        console.log('✓ Updated "images" field');

        console.log('\n✓ All labels updated successfully!');
        console.log('Please refresh the Directus admin panel to see the changes.');

    } catch (e) {
        console.error('Error:', e.message);
    }
}

updateLabels();
