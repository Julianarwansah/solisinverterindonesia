const mysql = require('mysql2/promise');
let argon2;
try {
    argon2 = require('argon2');
} catch (e) {
    console.error('Argon2 module not found. Please install it with: npm install argon2');
    process.exit(1);
}

const crypto = require('crypto');

async function createAdmin() {
    const email = 'admin@solis.id';
    const password = 'SolisAdmin2026!';

    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'db_solis'
        });

        console.log('Connected to DB.');

        // 1. Get Admin Role ID
        const [roles] = await connection.execute('SELECT id FROM directus_roles WHERE name = "Administrator" LIMIT 1');
        if (roles.length === 0) {
            console.error('Administrator role not found.');
            process.exit(1);
        }
        const roleId = roles[0].id;

        // 2. Hash Password
        const passwordHash = await argon2.hash(password);
        const userId = crypto.randomUUID();

        // 3. Insert User
        const [users] = await connection.execute('SELECT id FROM directus_users WHERE email = ?', [email]);
        if (users.length > 0) {
            console.log(`User ${email} already exists. Updating password...`);
            await connection.execute('UPDATE directus_users SET password = ? WHERE id = ?', [passwordHash, users[0].id]);
        } else {
            console.log(`Creating user ${email}...`);
            await connection.execute(
                'INSERT INTO directus_users (id, status, role, email, password) VALUES (?, ?, ?, ?, ?)',
                [userId, 'active', roleId, email, passwordHash]
            );
        }

        console.log(`Admin user ${email} ensure complete.`);
        await connection.end();

    } catch (err) {
        console.error('Error:', err);
    }
}

createAdmin();
