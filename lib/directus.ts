import { createDirectus, rest, readItems } from '@directus/sdk';

export interface Product {
    id: string;
    status: string;
    name: string;
    slug: string;
    description: string;
    category: string | Category;
    tags: string[];
    images: string[] | any[]; // Simplified for SDK better handling
    meta_title?: string;
    meta_description?: string;
    keywords?: string[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface Article {
    id: string;
    status: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string | DirectusFile;
    tags: string[];
    seo_title?: string;
    seo_description?: string;
    canonical_url?: string;
    og_image?: string | DirectusFile;
}

export interface DirectusFile {
    id: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    type: string;
    width: number;
    height: number;
}

interface Schema {
    products: Product[];
    product_categories: Category[];
    products_files: any[]; // Junction table
    articles: Article[];
    directus_files: DirectusFile[];
}

const directus = createDirectus<Schema>(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055')
    .with(rest({
        onRequest: (options) => ({
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`
            }
        })
    }));

export default directus;
