import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Katalog Produk Solis Inverter | Semua Tipe',
    description: 'Lihat katalog lengkap Solis Inverter. Temukan inverter yang tepat untuk sistem panel surya Anda, dari residensial hingga skala industri.',
};

async function getCategories(): Promise<any[]> {
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

async function getProducts() {
    try {
        const products = await directus.request(readItems('products', {
            fields: ['*', { images: ['*', { directus_files_id: ['*'] }] }] as any,
            sort: ['-date_created'] as any,
        }));
        return products as any[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();
    const categories = await getCategories();

    // Fallback categories if empty
    const displayCategories = categories.length > 0 ? categories : [
        { name: 'Inverter Residensial', slug: 'residensial', description: 'Solusi untuk rumah' },
        { name: 'Inverter Komersial', slug: 'komersial', description: 'Solusi untuk bisnis' },
        { name: 'Sistem Hybrid', slug: 'utilitas', description: 'Proyek skala besar' },
    ];

    return (
        <main className="bg-gray-50 min-h-screen pt-24">
            {/* Breadcrumbs & Simple Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-bold">Produk</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Katalog Produk</h1>
                            <p className="text-gray-400 font-medium mt-1">Menampilkan {products.length} produk pilihan terbaik</p>
                        </div>
                        {/* Sort UI - Simulation */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-gray-400 uppercase tracking-widest hidden sm:block">Urutkan:</span>
                            <div className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 cursor-pointer hover:border-orange-500 transition-all flex items-center gap-3">
                                Produk Terbaru
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-10">
                        {/* Categories List */}
                        <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 py-2 border-l-4 border-orange-500 pl-4">Kategori</h3>
                            <div className="space-y-2">
                                <Link href="/produk" className="flex items-center justify-between group p-3 rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-500/20 font-bold transition-all">
                                    <span>Semua Produk</span>
                                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{products.length}</span>
                                </Link>
                                {displayCategories.map((cat: any) => (
                                    <Link
                                        key={cat.id || cat.slug}
                                        href={`/produk/kategori/${cat.slug}`}
                                        className="flex items-center justify-between group p-3 rounded-2xl text-gray-500 hover:text-orange-600 hover:bg-white hover:shadow-sm transition-all font-bold"
                                    >
                                        <span>{cat.name}</span>
                                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Banner / Info */}
                        <div className="relative rounded-[32px] p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-3">Butuh Bantuan?</h4>
                                <p className="text-sm text-slate-400 mb-6 leading-relaxed">Konsultasikan kebutuhan energi Anda dengan tim ahli kami.</p>
                                <a
                                    href="https://wa.me/6281258885595"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-orange-600 transition-colors"
                                >
                                    WhatsApp Kami
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="group bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 flex flex-col overflow-hidden"
                                >
                                    {/* Image Container */}
                                    <Link href={`/produk/${product.slug}`} className="aspect-square relative overflow-hidden bg-gray-50 group-hover:bg-white transition-colors duration-500">
                                        {product.images?.[0]?.directus_files_id ? (
                                            <Image
                                                src={`http://localhost:8055/assets/${product.images[0].directus_files_id.id}`}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-200">
                                                <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500 flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur-sm px-6 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-900 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                                                Lihat Detil
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Content Area */}
                                    <div className="p-7 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2 block">Seri Inverter</span>
                                            <Link href={`/produk/${product.slug}`} className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 block mb-2 leading-tight">
                                                {product.name}
                                            </Link>
                                            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">
                                                {product.description?.replace(/<[^>]*>?/gm, '') || 'Kualitas premium inverter Solis untuk kestabilan energi Anda.'}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-gray-50">
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Harga</span>
                                                <span className="text-lg font-black text-gray-900">Hubungi Kami</span>
                                            </div>
                                            <Link
                                                href={`/produk/${product.slug}`}
                                                className="w-12 h-12 rounded-2xl bg-gray-950 text-white flex items-center justify-center hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-orange-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination UI - Simulation */}
                        <div className="mt-16 flex items-center justify-center gap-4">
                            <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 cursor-not-allowed">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-lg shadow-orange-500/20">1</div>
                            <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 font-bold hover:bg-white hover:border-orange-500 hover:text-orange-600 cursor-pointer transition-all">2</div>
                            <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 font-bold hover:bg-white hover:border-orange-500 hover:text-orange-600 cursor-pointer transition-all">3</div>
                            <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
