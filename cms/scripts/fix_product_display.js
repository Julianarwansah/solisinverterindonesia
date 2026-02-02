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

async function fixProductDisplay() {
    console.log('Fixing product display template...\n');

    try {
        // Update collection metadata to show product name
        console.log('Setting display template for products collection...');

        await request('PATCH', '/collections/products', {
            meta: {
                display_template: '{{name}}',
                sort_field: 'id'
            }
        });

        console.log('✓ Display template updated successfully!');
        console.log('\nNow products will show their names instead of IDs.');
        console.log('Please refresh the Directus admin panel.');

    } catch (e) {
        console.error('Error:', e.message);
    }
}

fixProductDisplay();
