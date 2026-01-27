const mysql = require('mysql2/promise');
let argon2;
try {
    argon2 = require('argon2');
} catch (e) {
    console.log('Argon2 not found, trying bcrypt...');
    try {
        // bcryptjs or bcrypt
        // Directus might use other hashing if argon2 is missing, but argon2 is standard.
    } catch (e) { }
}

const crypto = require('crypto');

async function createAdmin() {
    if (!argon2) {
        console.error('Argon2 module not found. Cannot hash password.');
        // We might check if we can import it from directus internal path? 
        // node_modules/directus/dist/...
        // But let's hope it's in root node_modules.
        process.exit(1);
    }

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
            // Maybe create it?
            // INSERT INTO directus_roles (id, name, icon, description, admin_access, app_access) VALUES (uuid, 'Administrator', 'verified', 'Admin', 1, 1)
        }
        const roleId = roles[0].id; // Use existing role ID

        // 2. Hash Password
        const passwordHash = await argon2.hash('admin123');
        const userId = crypto.randomUUID();

        // 3. Insert User
        // Check if exists first
        const [users] = await connection.execute('SELECT id FROM directus_users WHERE email = "admin@local.test"');
        if (users.length > 0) {
            console.log('User already exists. Updating password...');
            await connection.execute('UPDATE directus_users SET password = ? WHERE id = ?', [passwordHash, users[0].id]);
        } else {
            console.log('Creating user...');
            await connection.execute(
                'INSERT INTO directus_users (id, status, role, email, password) VALUES (?, ?, ?, ?, ?)',
                [userId, 'active', roleId, 'admin@local.test', passwordHash]
            );
        }

        console.log('Admin user ensure complete.');
        await connection.end();

    } catch (err) {
        console.error('Error:', err);
    }
}

createAdmin();
