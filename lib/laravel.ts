const LARAVEL_URL = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://127.0.0.1:8000';
const API_URL = `${LARAVEL_URL}/api`;

export async function fetchLaravel(path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch from Laravel: ${res.statusText}`);
    }

    return res.json();
}

export const laravel = {
    products: {
        list: (limit?: number) => fetchLaravel(`/products${limit ? `?limit=${limit}` : ''}`),
        get: (slug: string) => fetchLaravel(`/products/${slug}`),
        categories: () => fetchLaravel('/products/categories'),
        category: (slug: string) => fetchLaravel(`/products/category/${slug}`),
    },
    articles: {
        list: () => fetchLaravel('/articles'),
        get: (slug: string) => fetchLaravel(`/articles/${slug}`),
    }
};
