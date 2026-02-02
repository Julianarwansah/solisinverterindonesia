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

async function fixPermissions() {
    console.log('Fixing permissions and product visibility...\n');

    try {
        // 1. Remove status field requirement (make it optional)
        console.log('1. Making status field optional...');
        await request('PATCH', '/fields/products/status', {
            schema: {
                is_nullable: true,
                default_value: 'published'
            },
            meta: {
                required: false,
                hidden: false
            }
        });
        console.log('✓ Status field updated');

        // 2. Check current products
        console.log('\n2. Checking existing products...');
        const products = await request('GET', '/items/products?fields=id,name,status');
        console.log('Found products:', JSON.stringify(products.data, null, 2));

        console.log('\n✓ Fix completed!');
        console.log('Please refresh the Directus admin panel.');

    } catch (e) {
        console.error('Error:', e.message);
    }
}

fixPermissions();
