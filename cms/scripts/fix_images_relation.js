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

async function fix() {
    console.log('Starting Images Relation Fix...');

    try {
        // 1. Update the junction relation to point back to products with one_field
        console.log('Updating products_files -> products relation...');

        const updatePayload = {
            meta: {
                one_field: 'images',
                sort_field: null,
                one_deselect_action: 'nullify'
            }
        };

        await request('PATCH', '/relations/products_files/products_id', updatePayload);
        console.log('✓ Successfully updated products_files.products_id relation');

        // 2. Verify the relation
        console.log('\nVerifying relation...');
        const relations = await request('GET', '/relations/products_files');
        console.log('Current relations:', JSON.stringify(relations, null, 2));

        console.log('\n✓ Fix completed successfully!');
        console.log('\nPlease refresh the Directus admin panel and try again.');

    } catch (e) {
        console.error('Fix failed:', e.message);
    }
}

fix();
