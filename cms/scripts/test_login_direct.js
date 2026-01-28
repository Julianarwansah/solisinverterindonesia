async function testLogin() {
    const email = 'admin@solis.id';
    const password = 'SolisAdmin2026!';
    const url = 'http://127.0.0.1:8055/auth/login';

    console.log(`Testing login at ${url} with email: ${email}`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testLogin();
