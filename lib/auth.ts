import { cookies } from 'next/headers';

const SESSION_COOKIE = 'directus_session';

export async function setSession(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value;
}
