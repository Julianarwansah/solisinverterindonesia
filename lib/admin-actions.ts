'use client';

import directus from '@/lib/directus';
import { createItem, updateItem, deleteItem } from '@directus/sdk';
import { useRouter } from 'next/navigation';

export function useProductActions() {
    const router = useRouter();

    const saveProduct = async (data: any, id?: string) => {
        try {
            if (id) {
                await directus.request(updateItem('products', id, data));
            } else {
                await directus.request(createItem('products', data));
            }
            router.push('/admin/products');
            router.refresh();
            return { success: true };
        } catch (error: any) {
            console.error('Error saving product:', error);
            return { success: false, error: error.message };
        }
    };

    const removeProduct = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
        try {
            await directus.request(deleteItem('products', id));
            router.refresh();
            return { success: true };
        } catch (error: any) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message };
        }
    };

    return { saveProduct, removeProduct };
}

export function useArticleActions() {
    const router = useRouter();

    const saveArticle = async (data: any, id?: string) => {
        try {
            if (id) {
                await directus.request(updateItem('articles', id, data));
            } else {
                await directus.request(createItem('articles', data));
            }
            router.push('/admin/articles');
            router.refresh();
            return { success: true };
        } catch (error: any) {
            console.error('Error saving article:', error);
            return { success: false, error: error.message };
        }
    };

    const removeArticle = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
        try {
            await directus.request(deleteItem('articles', id));
            router.refresh();
            return { success: true };
        } catch (error: any) {
            console.error('Error deleting article:', error);
            return { success: false, error: error.message };
        }
    };

    return { saveArticle, removeArticle };
}

export function useCategoryActions() {
    const router = useRouter();

    const saveCategory = async (data: any, id?: string) => {
        try {
            if (id) {
                await directus.request(updateItem('product_categories', id, data));
            } else {
                await directus.request(createItem('product_categories', data));
            }
            router.push('/admin/categories');
            router.refresh();
            return { success: true };
        } catch (error: any) {
            console.error('Error saving category:', error);
            return { success: false, error: error.message };
        }
    };

    const removeCategory = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
        try {
            await directus.request(deleteItem('product_categories', id));
            router.refresh();
            return { success: true };
        } catch (error: any) {
            console.error('Error deleting category:', error);
            return { success: false, error: error.message };
        }
    };

    return { saveCategory, removeCategory };
}
