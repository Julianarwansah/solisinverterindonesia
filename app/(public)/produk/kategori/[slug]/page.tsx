import { laravel } from '@/lib/laravel';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategorySidebar from '@/components/CategorySidebar';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import MobileCategoryFilter from '@/components/MobileCategoryFilter';

export async function generateStaticParams() {
    try {
        const categories = await laravel.products.categories.list();
        return categories.map((cat: any) => ({
            slug: cat.slug,
        }));
    } catch (error) {
        console.error('Error generating static params for categories:', error);
        return [];
    }
}

async function getCategories() {
    try {
        return await laravel.products.categories.list();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function getCategory(slug: string) {
    try {
        return await laravel.products.categories.show(slug);
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

async function getProducts(categorySlug: string, page: number = 1, limit: number = 12) {
    try {
        return await laravel.products.list(page, limit, categorySlug);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return { data: [], meta: { total: 0, per_page: limit, current_page: page, last_page: 0 } };
    }
}

import ProductsClient from '../../ProductsClient';

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const itemsPerPage = 12;

    const [category, allCategories] = await Promise.all([
        getCategory(slug),
        getCategories(),
    ]);

    if (!category) {
        notFound();
    }

    const productsResponse = await getProducts(slug, 1, itemsPerPage);
    const products = productsResponse.data || [];
    const meta = productsResponse.meta || { total: 0, per_page: 12, current_page: 1, last_page: 0 };

    return (
        <ProductsClient
            initialProducts={products}
            initialMeta={meta as any}
            categories={allCategories as any[]}
            categorySlug={slug}
            categoryName={category.name}
            categoryDescription={category.description}
        />
    );
}
