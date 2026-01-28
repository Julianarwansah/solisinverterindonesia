import { createDirectus, rest, createField, createRelation, staticToken } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055')
    .with(staticToken('static-admin-token-12345'))
    .with(rest());

async function syncSchema() {
    try {
        console.log('--- SYNCING SCHEMA ---');

        // 1. Add Thumbnail Field
        console.log('Adding thumbnail field...');
        try {
            await directus.request(createField('product_categories', {
                field: 'thumbnail',
                type: 'uuid',
                meta: {
                    interface: 'file',
                    width: 'half',
                }
            }));
            await directus.request(createRelation({
                collection: 'product_categories',
                field: 'thumbnail',
                related_collection: 'directus_files',
                schema: {
                    on_delete: 'SET NULL',
                }
            }));
            console.log('✅ Thumbnail field added.');
        } catch (e: any) {
            console.log('Thumbnail field already exists or error:', e.message);
        }

        // 2. Add Parent Category Field
        console.log('Adding parent_category field...');
        try {
            await directus.request(createField('product_categories', {
                field: 'parent_category',
                type: 'integer',
                meta: {
                    interface: 'select-dropdown-m2o',
                    width: 'half',
                }
            }));
            await directus.request(createRelation({
                collection: 'product_categories',
                field: 'parent_category',
                related_collection: 'product_categories',
                schema: {
                    on_delete: 'SET NULL',
                }
            }));
            console.log('✅ Parent category field added.');
        } catch (e: any) {
            console.log('Parent category field already exists or error:', e.message);
        }

        // 3. Add Display Type Field
        console.log('Adding display_type field...');
        try {
            await directus.request(createField('product_categories', {
                field: 'display_type',
                type: 'string',
                meta: {
                    interface: 'select-dropdown',
                    width: 'half',
                    options: {
                        choices: [
                            { text: 'Default', value: 'default' },
                            { text: 'Products', value: 'products' },
                            { text: 'Subcategories', value: 'subcategories' },
                            { text: 'Both', value: 'both' }
                        ]
                    }
                },
                schema: {
                    default_value: 'default',
                }
            }));
            console.log('✅ Display type field added.');
        } catch (e: any) {
            console.log('Display type field already exists or error:', e.message);
        }

        console.log('--- SYNC COMPLETED ---');
    } catch (error: any) {
        console.error('Sync Error:', error.message || error);
    }
}

syncSchema();
