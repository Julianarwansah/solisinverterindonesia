const http = require('http');

const HOST = 'localhost';
const PORT = 8055;
const accessToken = 'static-admin-token-12345'; // As seen in setup-directus-schema.js

function request(method, path, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;

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

async function ensureField(collection, field, type, schemaOptions = {}, metaOptions = {}) {
    console.log(`Ensuring field ${collection}.${field}...`);
    try {
        await request('POST', `/fields/${collection}`, {
            field,
            type,
            schema: schemaOptions,
            meta: {
                ...metaOptions,
                interface: metaOptions.interface || 'input'
            }
        }, accessToken);
        console.log(`Field ${field} created.`);
    } catch (e) {
        console.log(`Field ${field} creation skipped (likely exists or error): ${e.message.split('\n')[0]}`);
    }
}

async function addSeoFields() {
    console.log('Starting SEO fields addition to product_categories...');

    await ensureField('product_categories', 'seo_title', 'string', {}, { interface: 'input' });
    await ensureField('product_categories', 'seo_description', 'text', {}, { interface: 'input-multiline' });
    await ensureField('product_categories', 'seo_keywords', 'json', {}, { interface: 'tags' });

    console.log('Finished adding SEO fields.');
}

addSeoFields().catch(err => {
    console.error('Failed to add SEO fields:', err);
});
