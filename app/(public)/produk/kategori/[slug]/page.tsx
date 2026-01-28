import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getCategories() {
    try {
        const categories = await directus.request(readItems('product_categories', {
            fields: ['*'] as any,
        }));
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

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
    const [category, allCategories] = await Promise.all([
        getCategoryData(slug),
        getCategories()
    ]);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(category.id);

    return (
        <div className="min-h-screen bg-white relative">
            {/* Page Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden z-10 bg-orange-50/50">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]" />

                {/* Decorative plus signs */}
                <div className="absolute top-20 left-[10%] text-orange-200 opacity-40 select-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M19 0h2v40h-2z" /><path d="M0 19h40v2H0z" />
                    </svg>
                </div>
                <div className="absolute bottom-20 right-[15%] text-orange-200 opacity-40 select-none">
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M19 0h2v40h-2z" /><path d="M0 19h40v2H0z" />
                    </svg>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
                            <Link href="/produk" className="hover:text-orange-600 transition-colors">Katalog</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600 font-black">{category.name}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8 capitalize">
                            {category.name}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                            {category.description || `Menampilkan koleksi produk terbaik kami dalam kategori ${category.name}.`}
                        </p>
                    </div>

                    {/* Mobile Category Filter - Horizontal Scroll */}
                    <div className="lg:hidden mt-12 -mx-2 overflow-x-auto no-scrollbar pb-2">
                        <div className="flex items-center gap-3 px-2 min-w-max">
                            <Link href="/produk" className="px-6 py-3 rounded-2xl bg-white border border-gray-100 text-sm font-bold text-gray-600">
                                Katalog
                            </Link>
                            {allCategories.map((cat: any) => (
                                <Link
                                    key={cat.id || cat.slug}
                                    href={`/produk/kategori/${cat.slug}`}
                                    className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${cat.slug === slug
                                            ? 'bg-gray-950 text-white shadow-xl shadow-gray-950/10'
                                            : 'bg-white border border-gray-100 text-gray-600 hover:border-orange-200 hover:text-orange-600'
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative z-10 bg-white w-full">
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
                                <div
                                    key={product.id}
                                    className="group bg-white rounded-[40px] border border-gray-100/50 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.12)] transition-all duration-700 flex flex-col overflow-hidden"
                                >
                                    {/* Image Container with sophisticated hover */}
                                    <Link href={`/produk/${product.slug}`} className="aspect-square relative overflow-hidden bg-gray-50/50 group-hover:bg-white transition-colors duration-700">
                                        {product.images && product.images.length > 0 && typeof product.images[0].directus_files_id === 'object' && product.images[0].directus_files_id !== null ? (
                                            <Image
                                                src={`http://localhost:8055/assets/${product.images[0].directus_files_id.id}`}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-10 transition-transform duration-1000 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-200">
                                                <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Advanced Hover Overlay */}
                                        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-700 flex items-center justify-center">
                                            <div className="bg-gray-950 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl scale-90 group-hover:scale-100">
                                                Lihat Detail
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Enhanced Content Area */}
                                    <div className="p-10 flex flex-col flex-1">
                                        <div className="mb-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="w-6 h-[1.5px] bg-orange-500/40" />
                                                <span className="text-[10px] font-[1000] uppercase tracking-[0.2em] text-orange-500">Premium Series</span>
                                            </div>
                                            <Link href={`/produk/${product.slug}`} className="text-2xl font-[1000] text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 block mb-3 tracking-tight leading-tight">
                                                {product.name}
                                            </Link>
                                            <div
                                                className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium"
                                                dangerouslySetInnerHTML={{ __html: product.description }}
                                            />
                                        </div>

                                        <div className="mt-auto flex items-center justify-between gap-4 pt-8 border-t border-gray-50">
                                            <div>
                                                <span className="text-[10px] font-[1000] text-gray-400 uppercase tracking-[0.2em] block mb-1">Status Harga</span>
                                                <span className="text-xl font-[1000] text-gray-950">Hubungi Kami</span>
                                            </div>
                                            <Link
                                                href={`/produk/${product.slug}`}
                                                className="w-14 h-14 rounded-[22px] bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-500 hover:rotate-[360deg] shadow-sm hover:shadow-orange-500/20"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Mobile Help Card - Visible only on mobile */}
                    <div className="lg:hidden mt-20">
                        <div className="relative rounded-[40px] p-10 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden shadow-2xl shadow-gray-950/50 group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <h4 className="text-2xl font-black mb-4 tracking-tight">Butuh Bantuan Ahli?</h4>
                                <p className="text-slate-400 mb-8 leading-relaxed font-medium">Tim kami siap membantu Anda memilih solusi energi terbaik.</p>
                                <a
                                    href="https://wa.me/6281258885595"
                                    className="w-full py-4 bg-orange-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-center"
                                >
                                    WhatsApp Kami
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
