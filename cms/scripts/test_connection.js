const http = require('http');

const HOST = 'localhost';
const PORT = 8055;

function req(method, path, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: HOST,
            port: PORT,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        if (body) {
            const data = JSON.stringify(body);
            options.headers['Content-Length'] = Buffer.byteLength(data);
        }

        const r = http.request(options, (res) => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => resolve({ status: res.statusCode, body: d }));
        });
        r.on('error', reject);
        if (body) r.write(JSON.stringify(body));
        r.end();
    });
}

async function test() {
    console.log('Testing /server/ping...');
    try {
        const ping = await req('GET', '/server/ping');
        console.log('Ping Status:', ping.status);
        console.log('Ping Body:', ping.body.substring(0, 100)); // Only start
    } catch (e) { console.log('Ping Failed:', e.message); }

    console.log('Testing /auth/login with mode:json...');
    try {
        const payload = { email: 'admin@local.test', password: 'admin123', mode: 'json' };
        console.log('Sending payload:', JSON.stringify(payload));
        const login = await req('POST', '/auth/login', payload);
        console.log('Login Status:', login.status);
        console.log('Login Body:', login.body);
    } catch (e) { console.log('Login Failed:', e.message); }
}

test();
