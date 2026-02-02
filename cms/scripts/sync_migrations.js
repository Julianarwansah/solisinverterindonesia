const mysql = require('mysql2/promise');

async function run() {
    console.log('Starting Migration Sync...');
    try {
        const conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        const migrationsToSync = [
            { version: '20240924B', name: 'populate-versioning-deltas' },
            { version: '20250224A', name: 'visual-editor' },
            { version: '20250609A', name: 'license-banner' },
            { version: '20250613A', name: 'add-project-id' },
            { version: '20250718A', name: 'add-direction' },
            { version: '20250813A', name: 'add-mcp' },
            { version: '20251012A', name: 'add-field-searchable' },
            { version: '20251014A', name: 'add-project-owner' }
        ];

        for (const migration of migrationsToSync) {
            try {
                // Check if already exists
                const [existing] = await conn.execute('SELECT * FROM directus_migrations WHERE version = ?', [migration.version]);
                if (existing.length === 0) {
                    console.log(`Syncing migration: ${migration.version} - ${migration.name}`);
                    await conn.execute('INSERT INTO directus_migrations (version, name) VALUES (?, ?)', [migration.version, migration.name]);
                    console.log(`Success: ${migration.version}`);
                } else {
                    console.log(`Migration already exists: ${migration.version}`);
                }
            } catch (err) {
                console.error(`Failed to sync ${migration.version}:`, err.message);
            }
        }

        await conn.end();
        console.log('Migration Sync Finished.');
    } catch (e) {
        console.error('Migration Sync process failed:', e);
    }
}

run();
