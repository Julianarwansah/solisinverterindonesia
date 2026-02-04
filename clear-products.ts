import { createDirectus, rest, staticToken, readItems, deleteItems } from '@directus/sdk';

const directus = createDirectus('http://127.0.0.1:8055')
    .with(staticToken('static-admin-token-12345'))
    .with(rest());

async function clearData() {
    console.log('🧹 Clearing all products and categories...');
    try {
        // 1. Delete all Products
        const products = await directus.request(readItems('products', { fields: ['id'], limit: -1 }));
        if (products.length > 0) {
            console.log(`Found ${products.length} products. Deleting...`);
            await directus.request(deleteItems('products', products.map(p => p.id)));
        } else {
            console.log('No products found.');
        }

        // 2. Delete all Categories
        const categories = await directus.request(readItems('product_categories', { fields: ['id'], limit: -1 }));
        if (categories.length > 0) {
            console.log(`Found ${categories.length} categories. Deleting...`);
            await directus.request(deleteItems('product_categories', categories.map(c => c.id)));
        } else {
            console.log('No categories found.');
        }

        console.log('✅ All data cleared successfully.');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

clearData();
