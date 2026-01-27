const mysql = require('mysql2/promise');

async function setToken() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        console.log('Connected to DB.');

        const token = 'static-admin-token-12345';

        await connection.execute('UPDATE directus_users SET token = ? WHERE email = "admin@local.test"', [token]);
        console.log('Token updated for admin@local.test');

        await connection.end();
    } catch (err) {
        console.error('Error:', err);
    }
}

setToken();
