import fs from 'fs';
import { createDirectus, rest, readFields, staticToken } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055')
    .with(staticToken('static-admin-token-12345'))
    .with(rest());

async function testFetch() {
    try {
        const fields = await directus.request(readFields('product_categories'));
        let output = '--- FIELDS for product_categories ---\n';
        for (const field of fields) {
            output += `Field: ${field.field} (Type: ${field.type})\n`;
        }
        output += '--- END FIELDS ---\n';
        fs.writeFileSync('debug-output.txt', output);
        console.log('Output written to debug-output.txt');
    } catch (error: any) {
        console.error('Fetch Error:', error.message || error);
    }
}

testFetch();

testFetch();
