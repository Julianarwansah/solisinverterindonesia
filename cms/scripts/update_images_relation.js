const mysql = require('mysql2/promise');

async function checkRelations() {
    try {
        const conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        console.log('Checking products_files relations...\n');

        const [relations] = await conn.execute(
            'SELECT * FROM directus_relations WHERE many_collection = ?',
            ['products_files']
        );

        console.log('Current relations:');
        console.log(JSON.stringify(relations, null, 2));

        console.log('\n\nUpdating relation to add one_field...');

        // Update the relation to include one_field
        await conn.execute(
            `UPDATE directus_relations 
             SET one_field = 'images' 
             WHERE many_collection = 'products_files' 
             AND many_field = 'products_id'`
        );

        console.log('✓ Updated successfully!');

        // Verify
        const [updated] = await conn.execute(
            'SELECT * FROM directus_relations WHERE many_collection = ?',
            ['products_files']
        );

        console.log('\nUpdated relations:');
        console.log(JSON.stringify(updated, null, 2));

        await conn.end();
        console.log('\n✓ Done! Please refresh Directus admin panel.');

    } catch (e) {
        console.error('Error:', e);
    }
}

checkRelations();
