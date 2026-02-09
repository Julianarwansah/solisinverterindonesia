import { laravel } from '@/lib/laravel';
import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
    title: 'Katalog Produk Solis Inverter | Semua Tipe',
    description: 'Lihat katalog lengkap Solis Inverter. Temukan inverter yang tepat untuk sistem panel surya Anda, dari residensial hingga skala industri.',
};

async function getCategories() {
    try {
        return await laravel.products.categories();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function getProducts(page: number = 1, perPage: number = 12) {
    try {
        return await laravel.products.list(page, perPage);
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return { data: [], meta: { total: 0, per_page: perPage, current_page: page, last_page: 0 } };
    }
}

export default async function ProductsPage() {
    const itemsPerPage = 12;

    const [productsResponse, categories] = await Promise.all([
        getProducts(1, itemsPerPage),
        getCategories(),
    ]);

    const initialProducts = productsResponse.data || [];
    const initialMeta = productsResponse.meta || { total: 0, per_page: 12, current_page: 1, last_page: 1 };

    return (
        <ProductsClient
            initialProducts={initialProducts}
            initialMeta={initialMeta}
            categories={categories}
        />
    );
}
