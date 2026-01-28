import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { login, createDirectus, rest } from '@directus/sdk';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email dan password wajib diisi.' },
                { status: 400 }
            );
        }

        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        // Use 127.0.0.1 for server-side reliability
        const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace('localhost', '127.0.0.1') || 'http://127.0.0.1:8055';

        // Create a clean client for authentication to avoid interference from main client config
        const authClient = createDirectus(baseUrl).with(rest());

        console.log(`SDK Login attempt for: ${cleanEmail} at ${baseUrl}`);

        // Authenticate with Directus using SDK
        // In v11+ the login function takes (email, password) and optional otp string
        const result = await authClient.request(login({ email: cleanEmail, password: cleanPassword })) as any;

        if (result && result.access_token) {
            // Set the session cookie
            await setSession(result.access_token);

            return NextResponse.json({
                message: 'Login berhasil.',
                user: result
            });
        }

        // If something went wrong but no error was thrown
        throw new Error('Gagal mendapatkan token akses dari CMS.');

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: error.message || 'Terjadi kesalahan internal.' },
            { status: 500 }
        );
    }
}
