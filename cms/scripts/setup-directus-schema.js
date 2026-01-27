const http = require('http');

const HOST = 'localhost';
const PORT = 8055;
const EMAIL = 'admin@local.test';
const PASSWORD = 'admin123';

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
                        // Some endpoints like DELETE might return empty body
                        resolve(data ? JSON.parse(data) : {});
                    } catch (e) {
                        // Fallback for non-JSON response if any
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

async function setup() {
    console.log('Using static token...');
    // const loginData = await request('POST', '/auth/login', { email: EMAIL, password: PASSWORD, mode: 'json' });
    // const accessToken = loginData.data.access_token;
    const accessToken = 'static-admin-token-12345';
    console.log('Authenticated via token.');

    // Helper to check and create collection
    async function ensureCollection(collection, icon) {
        try {
            await request('GET', `/collections/${collection}`, null, accessToken);
            console.log(`Collection ${collection} exists.`);
        } catch (e) {
            if (e.message.includes('403') || e.message.includes('404') || e.message.includes('400')) { // 403 usually means forbidden but 404 is not found
                // Directus returns 403 or 404 depending on permissions/existence. Admin gets 404 if not found?
                // Actually we'll just try to create. 
                // Better: List collections first or just try CREATE and catch error?
                // Let's rely on GET returning error if not exists.
            }
            console.log(`Creating collection ${collection}...`);
            try {
                await request('POST', '/collections', {
                    collection,
                    schema: {},
                    meta: {
                        icon,
                        hidden: false,
                        archive_field: 'status',
                        archive_value: 'archived',
                        unarchive_value: 'draft'
                    }
                }, accessToken);
                console.log(`Created collection ${collection}.`);
            } catch (err) {
                if (err.message.includes('DATA_UNIQUE')) {
                    console.log(`Collection ${collection} already exists (race condition).`);
                } else {
                    console.error(`Error creating collection ${collection}:`, err.message);
                }
            }
        }
    }

    // Checking if field exists is hard via API without listing.
    // Simpler: Just try to create field, ignore if conflict.
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

    // Relation Helper
    async function ensureRelation(collection, field, relatedCollection, type = 'm2o', metaOpts = {}) {
        console.log(`Ensuring relation ${collection}.${field} -> ${relatedCollection}...`);
        try {
            await request('POST', '/relations', {
                collection,
                field,
                related_collection: relatedCollection,
                schema: { on_delete: 'SET NULL' },
                meta: metaOpts
            }, accessToken);
        } catch (e) {
            console.log(`Relation creation skipped: ${e.message.split('\n')[0]}`);
        }
    }

    // 1. Categories
    await ensureCollection('product_categories', 'category');
    await ensureField('product_categories', 'id', 'uuid', { is_primary_key: true }, { hidden: true });
    await ensureField('product_categories', 'name', 'string', {}, { interface: 'input', display: 'raw' });
    await ensureField('product_categories', 'slug', 'string', { is_unique: true }, { interface: 'slug', options: { slugify: { field: 'name' } } });
    await ensureField('product_categories', 'description', 'text', {}, { interface: 'input-multiline' });

    // 2. Products
    await ensureCollection('products', 'inventory_2');
    await ensureField('products', 'id', 'uuid', { is_primary_key: true }, { hidden: true });
    await ensureField('products', 'status', 'string', { default_value: 'draft' }, { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }, { text: 'Archived', value: 'archived' }] } });
    await ensureField('products', 'name', 'string', {}, { interface: 'input', display: 'raw' });
    await ensureField('products', 'slug', 'string', { is_unique: true }, { interface: 'slug', options: { slugify: { field: 'name' } } });
    await ensureField('products', 'description', 'text', {}, { interface: 'input-rich-text-html' });
    await ensureField('products', 'category', 'uuid', {}, { interface: 'select-dropdown-m2o', special: ['m2o'] });
    // Relation creation needs to happen after field? OR API creates field automatically if relation posted?
    // In Directus, creating a relation usually requires the field to exist or creates it?
    // Safest: Create field, then relation.

    await ensureField('products', 'tags', 'json', {}, { interface: 'tags' });

    // SEO
    await ensureField('products', 'meta_title', 'string', {}, { interface: 'input' });
    await ensureField('products', 'meta_description', 'text', {}, { interface: 'input-multiline' });
    await ensureField('products', 'keywords', 'json', {}, { interface: 'tags' });

    // 3. Articles
    await ensureCollection('articles', 'article');
    await ensureField('articles', 'id', 'uuid', { is_primary_key: true }, { hidden: true });
    await ensureField('articles', 'status', 'string', { default_value: 'draft' }, { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }, { text: 'Archived', value: 'archived' }] } });
    await ensureField('articles', 'title', 'string', {}, { interface: 'input', display: 'raw' });
    await ensureField('articles', 'slug', 'string', { is_unique: true }, { interface: 'slug', options: { slugify: { field: 'title' } } });
    await ensureField('articles', 'content', 'text', {}, { interface: 'input-rich-text-html' });
    await ensureField('articles', 'excerpt', 'text', {}, { interface: 'input-multiline' });
    await ensureField('articles', 'featured_image', 'uuid', {}, { interface: 'file-image' });
    await ensureField('articles', 'tags', 'json', {}, { interface: 'tags' });

    // SEO
    await ensureField('articles', 'seo_title', 'string', {}, { interface: 'input' });
    await ensureField('articles', 'seo_description', 'text', {}, { interface: 'input-multiline' });
    await ensureField('articles', 'canonical_url', 'string', {}, { interface: 'input' });
    await ensureField('articles', 'og_image', 'uuid', {}, { interface: 'file-image' });

    // 4. Relations Linkage
    await ensureRelation('products', 'category', 'product_categories', 'm2o', { sort_field: null, one_collection_field: null, one_allowed_collections: null, one_deselect_action: 'nullify', junction_field: null });
    await ensureRelation('articles', 'featured_image', 'directus_files');
    await ensureRelation('articles', 'og_image', 'directus_files');

    // 5. M2M Products Files
    await ensureCollection('products_files', 'layers'); // junction is typically hidden
    await ensureField('products_files', 'id', 'integer', { is_primary_key: true, has_auto_increment: true }, { hidden: true });
    await ensureField('products_files', 'products_id', 'uuid', {}, { hidden: true });
    await ensureField('products_files', 'directus_files_id', 'uuid', {}, { hidden: true });

    // Alias on Products
    await ensureField('products', 'images', 'alias', {}, {
        interface: 'files',
        special: ['m2m'],
        options: { junctionField: 'products_id' }
    });

    // M2M Relations
    // products_files.products_id -> products (One side of M2M)
    // IMPORTANT: For M2M to show up in 'products.images', we need to set 'one_field' in the junction relation metadata back to 'images'.
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
        }, accessToken);
        console.log('Relation products_files.products_id established.');
    } catch (e) { console.log('Relation products_files.products_id skipped/error ' + e.message.split('\n')[0]); }

    // products_files.directus_files_id -> directus_files (Other side)
    try {
        await request('POST', '/relations', {
            collection: 'products_files',
            field: 'directus_files_id',
            related_collection: 'directus_files',
            schema: { on_delete: 'CASCADE' },
            meta: {
                junction_field: 'products_id'
            }
        }, accessToken);
        console.log('Relation products_files.directus_files_id established.');
    } catch (e) { console.log('Relation products_files.directus_files_id skipped/error ' + e.message.split('\n')[0]); }

    console.log('Setup finished.');
}

setup().catch(err => {
    console.error('Setup failed:', err);
});
