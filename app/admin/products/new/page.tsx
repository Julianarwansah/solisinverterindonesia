import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import ProductForm from '@/components/admin/ProductForm';

async function getCategories() {
    try {
        return await directus.request(readItems('product_categories', {
            fields: ['id', 'name'] as any,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export default async function NewProductPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-[1000] text-gray-950 mb-4 tracking-tight">Tambah Produk Baru</h1>
                <p className="text-xl font-medium text-gray-500 max-w-2xl">Lengkapi informasi produk di bawah ini untuk menambahkannya ke katalog.</p>
            </div>

            <ProductForm categories={categories as any} />
        </div>
    );
}
