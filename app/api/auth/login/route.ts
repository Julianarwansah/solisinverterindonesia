import { NextResponse } from 'next/server';
import directus from '@/lib/directus';
import { login } from '@directus/sdk';
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

        // Authenticate with Directus
        const result = await directus.request(
            login(email, password, { mode: 'json' })
        );

        if (result.access_token) {
            // Set the session cookie
            await setSession(result.access_token);

            return NextResponse.json({
                message: 'Login berhasil.',
                user: result
            });
        }

        throw new Error('Gagal mendapatkan token akses.');

    } catch (error: any) {
        console.error('Login error:', error);

        // Handle specific Directus errors if needed
        const message = error.message || 'Email atau password salah.';
        return NextResponse.json(
            { message },
            { status: 401 }
        );
    }
}
