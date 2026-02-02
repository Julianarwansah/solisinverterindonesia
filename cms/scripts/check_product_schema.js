const mysql = require('mysql2/promise');

async function run() {
    try {
        const conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        const [settings] = await conn.execute('DESCRIBE directus_settings');
        console.log('--- directus_settings columns ---');
        console.log(JSON.stringify(settings.map(s => s.Field), null, 2));

        await conn.end();
    } catch (e) {
        console.error('Database inspection failed:', e);
    }
}

run();
