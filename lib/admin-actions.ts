'use server';

import directus from '@/lib/directus';
import { createItem, updateItem, deleteItem, uploadFiles } from '@directus/sdk';
import { revalidatePath } from 'next/cache';

export async function uploadFileAction(formData: FormData) {
    try {
        const response = await directus.request(uploadFiles(formData));
        return { success: true, data: response };
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return { success: false, error: error.message || 'Gagal mengunggah file.' };
    }
}

export async function saveProductAction(data: any, id?: string) {
    try {
        if (id) {
            await directus.request(updateItem('products', id, data));
        } else {
            await directus.request(createItem('products', data));
        }
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error: any) {
        console.error('Error saving product:', error);
        return { success: false, error: error.message || 'Gagal menyimpan produk.' };
    }
}

export async function removeProductAction(id: string) {
    try {
        await directus.request(deleteItem('products', id));
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting product:', error);
        return { success: false, error: error.message || 'Gagal menghapus produk.' };
    }
}

export async function saveArticleAction(data: any, id?: string) {
    try {
        if (id) {
            await directus.request(updateItem('articles', id, data));
        } else {
            await directus.request(createItem('articles', data));
        }
        revalidatePath('/admin/articles');
        return { success: true };
    } catch (error: any) {
        console.error('Error saving article:', error);
        return { success: false, error: error.message || 'Gagal menyimpan artikel.' };
    }
}

export async function removeArticleAction(id: string) {
    try {
        await directus.request(deleteItem('articles', id));
        revalidatePath('/admin/articles');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting article:', error);
        return { success: false, error: error.message || 'Gagal menghapus artikel.' };
    }
}

export async function saveCategoryAction(data: any, id?: string) {
    try {
        if (id) {
            await directus.request(updateItem('product_categories', id, data));
        } else {
            await directus.request(createItem('product_categories', data));
        }
        revalidatePath('/admin/categories');
        return { success: true };
    } catch (error: any) {
        console.error('Error saving category:', error);
        return { success: false, error: error.message || 'Gagal menyimpan kategori.' };
    }
}

export async function removeCategoryAction(id: string) {
    try {
        await directus.request(deleteItem('product_categories', id));
        revalidatePath('/admin/categories');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting category:', error);
        return { success: false, error: error.message || 'Gagal menghapus kategori.' };
    }
}
