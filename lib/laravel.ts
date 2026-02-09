const LARAVEL_URL = process.env.LARAVEL_API_URL || process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://127.0.0.1:8000';
const API_URL = `${LARAVEL_URL}/api`;

export async function fetchLaravel(path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...(typeof window === 'undefined' ? { next: { revalidate: 3600 } } : { cache: 'default' })
    });

    if (!res.ok) {
        try {
            const errorBody = await res.json();
            throw new Error(errorBody.message || `Laravel API error: ${res.status}`);
        } catch (e) {
            throw new Error(`Laravel API error: ${res.status} ${res.statusText}`);
        }
    }

    return res.json();
}

export function getImageUrl(path: string | null | undefined) {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http')) return path;

    const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';

    // Untuk Hostinger: Akses langsung ke folder storage Laravel yang terverifikasi (laravel_app/storage/app/public)
    if (path.startsWith('products/') || path.startsWith('articles/') || path.startsWith('categories/')) {
        return `${baseUrl}/laravel_app/storage/app/public/${path}`;
    }

    // Default: untuk folder images/ statis di root
    return `${baseUrl}/${path}`;
}

export const laravel = {
    products: {
        list: async (page = 1, limit = 12, categorySlug?: string) => {
            let url = `/products?page=${page}&per_page=${limit}`;
            if (categorySlug) url += `&category=${categorySlug}`;
            const data = await fetchLaravel(url);
            return {
                data: data.data,
                meta: {
                    current_page: data.current_page,
                    last_page: data.last_page,
                    per_page: data.per_page,
                    total: data.total
                }
            };
        },
        show: (slug: string) => fetchLaravel(`/products/${slug}`),
        categories: {
            list: () => fetchLaravel('/categories'),
            show: (slug: string) => fetchLaravel(`/categories/${slug}`),
        },
    },
    articles: {
        list: async (page = 1, limit = 12) => {
            const data = await fetchLaravel(`/articles?page=${page}&per_page=${limit}`);
            return {
                data: data.data,
                meta: {
                    current_page: data.current_page,
                    last_page: data.last_page,
                    per_page: data.per_page,
                    total: data.total
                }
            };
        },
        show: (slug: string) => fetchLaravel(`/articles/${slug}`),
    }
};
