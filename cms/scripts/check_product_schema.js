const mysql = require('mysql2/promise');

async function run() {
    try {
        const conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        const [migrations] = await conn.execute('SELECT * FROM directus_migrations ORDER BY timestamp DESC LIMIT 5');
        console.log('--- directus_migrations entries ---');
        console.log(JSON.stringify(migrations, null, 2));

        await conn.end();
    } catch (e) {
        console.error('Database inspection failed:', e);
    }
}

run();
