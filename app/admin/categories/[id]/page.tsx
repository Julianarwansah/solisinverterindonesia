import directus from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import CategoryForm from '@/components/admin/CategoryForm';
import { notFound } from 'next/navigation';

async function getCategories() {
    try {
        const response = await directus.request(readItems('product_categories', {
            fields: ['id', 'name'] as any,
        }));
        return response as any[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function getCategory(id: string) {
    try {
        return await directus.request(readItem('product_categories', id, {
            fields: ['*'] as any,
        }));
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

export default async function EditCategoryPage({ params }: any) {
    const { id } = await params;
    const [category, categories] = await Promise.all([
        getCategory(id),
        getCategories(),
    ]);

    if (!category) {
        notFound();
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100">
                <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">Inventory System</h2>
                <h1 className="text-5xl font-[1000] text-gray-950 tracking-tight">Edit Kategori</h1>
                <p className="mt-4 text-xl font-medium text-gray-400 max-w-2xl">Perbarui informasi untuk kategori <span className="text-orange-600 font-black">{category.name}</span>.</p>
            </div>

            <CategoryForm initialData={category as any} categories={categories} />
        </div>
    );
}
