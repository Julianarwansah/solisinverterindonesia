const http = require('http');

const TOKEN = 'static-admin-token-12345';
const HOST = 'localhost';
const PORT = 8055;

function request(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: path,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ error: 'Invalid JSON' });
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

async function verify() {
    console.log('Verifying Collections...');
    const collections = await request('/collections');
    if (collections.data) {
        const names = collections.data.map(c => c.collection);
        console.log('Found Collections:', names.filter(n => !n.startsWith('directus_')));

        const expected = ['products', 'articles', 'product_categories', 'products_files'];
        const missing = expected.filter(e => !names.includes(e));

        if (missing.length === 0) {
            console.log('SUCCESS: All expected collections found.');
        } else {
            console.error('FAILURE: Missing collections:', missing);
        }
    } else {
        console.error('Failed to list collections:', collections);
    }

    console.log('\nVerifying Fields for Products...');
    const productFields = await request('/fields/products');
    if (productFields.data) {
        const fields = productFields.data.map(f => f.field);
        console.log('Product Fields:', fields);
        const mustHave = ['category', 'tags', 'images']; // images is alias
        const missing = mustHave.filter(f => !fields.includes(f));
        if (missing.length === 0) console.log('SUCCESS: Key product fields found.');
        else console.error('FAILURE: Missing product fields:', missing);
    }
}

verify();
