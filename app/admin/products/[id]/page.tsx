import directus from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
    try {
        return await directus.request(readItem('products', id, {
            fields: ['*'] as any,
        }));
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

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

interface EditProductPageProps {
    params: { id: string };
}

export default async function EditProductPage({ params }: any) {
    const { id } = await params;
    const [product, categories] = await Promise.all([
        getProduct(id),
        getCategories(),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-[1000] text-gray-950 mb-4 tracking-tight">Edit Produk</h1>
                <p className="text-xl font-medium text-gray-500 max-w-2xl">Perbarui informasi untuk <span className="text-orange-600 font-black">{product.name}</span> di bawah ini.</p>
            </div>

            <ProductForm initialData={product as any} categories={categories as any} />
        </div>
    );
}
