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
    console.log('Starting Fix for Product Image Relations...');

    // 1. Fix products.image (Single Image)
    console.log('Ensuring relation products.image -> directus_files...');
    try {
        await request('POST', '/relations', {
            collection: 'products',
            field: 'image',
            related_collection: 'directus_files',
            schema: { on_delete: 'SET NULL' }
        });
        console.log('Successfully established products.image relation.');
    } catch (e) {
        console.log('Relation products.image likely exists or error: ' + e.message.split('\n')[0]);
    }

    // 2. Fix products.images (Gallery M2M)
    // We need to ensure the junction table relation points back to the alias field
    console.log('Ensuring relation products_files.products_id -> products with one_field="images"...');
    try {
        // Find existing relation ID first or just UPSERT if possible? 
        // Directus doesn't have UPSERT for relations via API easily without ID.
        // We'll try to find it.
        const relations = await request('GET', '/relations/products_files/products_id');
        const relId = relations.data.meta.id;

        await request('PATCH', `/relations/products_files/products_id`, {
            meta: {
                one_field: 'images',
                junction_field: 'directus_files_id'
            }
        });
        console.log('Successfully updated products_files.products_id relation metadata.');
    } catch (e) {
        console.log('Updating junction relation failed, attempting to create...');
        try {
            await request('POST', '/relations', {
                collection: 'products_files',
                field: 'products_id',
                related_collection: 'products',
                schema: { on_delete: 'CASCADE' },
                meta: {
                    one_field: 'images',
                    junction_field: 'directus_files_id'
                }
            });
            console.log('Successfully created products_files.products_id relation.');
        } catch (err) {
            console.log('Create junction relation failed: ' + err.message.split('\n')[0]);
        }
    }

    console.log('Fix process finished.');
}

fix().catch(err => {
    console.error('Fix failed:', err);
});
