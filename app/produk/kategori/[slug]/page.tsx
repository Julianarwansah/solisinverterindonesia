import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCategoryData(slug: string) {
    try {
        const categories = await directus.request(readItems('product_categories', {
            filter: { slug: { _eq: slug } },
            fields: ['*'] as any,
        }));

        if (!categories || categories.length === 0) return null;
        return categories[0];
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

async function getProductsByCategory(categoryId: string) {
    try {
        const products = await directus.request(readItems('products', {
            filter: { category: { _eq: categoryId } },
            fields: ['*', { images: ['*', { directus_files_id: ['*'] }] }] as any,
        }));
        return products;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryData(slug);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(category.id);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-white py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-8">
                    <Link href="/" className="text-orange-600 font-bold mb-8 inline-block hover:translate-x-[-4px] transition-transform">
                        ← Kembali ke Beranda
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        {category.name}
                    </h1>
                    <p className="text-gray-500 text-xl max-w-3xl leading-relaxed">
                        {category.description || `Menampilkan koleksi produk terbaik kami dalam kategori ${category.name}.`}
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-8 py-20">
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                        <div className="text-gray-400 font-medium mb-4">Belum ada produk dalam kategori ini.</div>
                        <Link href="/produk" className="text-orange-600 font-bold hover:underline">
                            Lihat semua produk →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product: any) => (
                            <Link
                                href={`/produk/${product.slug}`}
                                key={product.id}
                                className="group bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                {product.images && product.images.length > 0 && (
                                    <div className="aspect-square relative mb-8 bg-gray-50 rounded-2xl overflow-hidden p-6 group-hover:bg-orange-50 transition-colors">
                                        {typeof product.images[0].directus_files_id === 'object' && product.images[0].directus_files_id !== null && (
                                            <Image
                                                src={`http://localhost:8055/assets/${product.images[0].directus_files_id.id}`}
                                                alt={product.name}
                                                fill
                                                className="object-contain transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}
                                    </div>
                                )}
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                        {product.name}
                                    </h2>
                                    <div
                                        className="text-gray-500 line-clamp-2 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                    <div className="flex items-center justify-between pt-4">
                                        <span className="text-orange-600 font-bold group-hover:translate-x-2 transition-transform">
                                            Selengkapnya →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
