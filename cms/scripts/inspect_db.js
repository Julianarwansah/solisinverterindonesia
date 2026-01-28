const mysql = require('mysql2/promise');

async function inspect() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        console.log('Connected to database.');

        // Check columns of directus_users
        try {
            const [users] = await connection.execute('SELECT id, email, status, role FROM directus_users');
            console.log('USERS_COUNT:', users.length);
            users.forEach((u, i) => {
                const hex = Buffer.from(u.email).toString('hex');
                console.log(`USER_${i}_EMAIL:`, `"${u.email}"`, `(HEX: ${hex})`);
            });
        } catch (e) {
            console.log('Error querying directus_users:', e.message);
        }

        // Check roles
        try {
            const [roles] = await connection.execute('SELECT id, name FROM directus_roles');
            console.log('ROLES_COUNT:', roles.length);

        } catch (e) {
            console.log('Error querying directus_roles:', e.message);
        }

        await connection.end();
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

inspect();
