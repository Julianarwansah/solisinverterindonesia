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
        <main className="bg-white min-h-screen relative">
            {/* Page Hero Section */}
            <section className="relative pt-12 pb-16 overflow-hidden z-10 bg-orange-50/50">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]" />

                {/* Decorative plus signs - similar to reference */}
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
                            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600">Produk</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8">
                            Katalog <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">Produk</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                            Temukan solusi inverter terbaik untuk kebutuhan energi Anda. Kami menyediakan berbagai pilihan untuk sistem residensial, komersial, hingga skala industri.
                        </p>
                    </div>
                </div>
            </section>

            <div className="sticky top-20 z-30 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-sm">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-orange-500 rounded-full" />
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Katalog Produk</p>
                                <p className="text-gray-900 text-xl font-[1000] tracking-tight">Menampilkan {products.length} pilihan terbaik</p>
                            </div>
                        </div>

                        {/* Sort UI */}
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:block">Urutkan:</span>
                            <div className="group relative">
                                <div className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 cursor-pointer group-hover:border-orange-500 transition-all flex items-center gap-4 shadow-sm group-hover:shadow-orange-500/5">
                                    Produk Terbaru
                                    <svg className="w-4 h-4 text-orange-500 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 bg-white w-full">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block lg:col-span-3 space-y-12">
                            {/* Categories List */}
                            <div className="bg-gray-50/50 rounded-[40px] p-8 border border-gray-100/50">
                                <h3 className="text-xs font-[1000] text-gray-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-orange-500/30" />
                                    Kategori
                                </h3>
                                <div className="space-y-3">
                                    <Link href="/produk" className="flex items-center justify-between group px-5 py-4 rounded-2xl bg-gray-950 text-white shadow-2xl shadow-gray-950/20 font-black transition-all hover:-translate-y-1">
                                        <span className="text-sm">Semua Produk</span>
                                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{products.length}</span>
                                    </Link>
                                    {displayCategories.map((cat: any) => (
                                        <Link
                                            key={cat.id || cat.slug}
                                            href={`/produk/kategori/${cat.slug}`}
                                            className="flex items-center justify-between group px-5 py-4 rounded-2xl text-gray-600 hover:text-orange-600 bg-white hover:shadow-xl hover:shadow-orange-500/5 border border-transparent hover:border-orange-100 transition-all font-bold hover:-translate-y-1"
                                        >
                                            <span className="text-sm">{cat.name}</span>
                                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Premium Help Card */}
                            <div className="relative rounded-[40px] p-10 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden shadow-2xl shadow-gray-950/50 group">
                                {/* Animated circle patterns */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/10 rounded-full blur-[40px] translate-y-1/3 -translate-x-1/3" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-black mb-4 tracking-tight">Butuh Bantuan Ahli?</h4>
                                    <p className="text-slate-400 mb-8 leading-relaxed font-medium">Tim kami siap membantu Anda memilih solusi energi terbaik.</p>
                                    <a
                                        href="https://wa.me/6281258885595"
                                        className="w-full py-4 bg-orange-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 text-center"
                                    >
                                        WhatsApp Kami
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div className="lg:col-span-9">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group bg-white rounded-[40px] border border-gray-100/50 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.12)] transition-all duration-700 flex flex-col overflow-hidden"
                                    >
                                        {/* Image Container with sophisticated hover */}
                                        <Link href={`/produk/${product.slug}`} className="aspect-square relative overflow-hidden bg-gray-50/50 group-hover:bg-white transition-colors duration-700">
                                            {product.images?.[0]?.directus_files_id ? (
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
                                                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium">
                                                    {product.description?.replace(/<[^>]*>?/gm, '') || 'Kualitas premium inverter Solis untuk kestabilan energi Anda.'}
                                                </p>
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

                            {/* Pagination UI - Simulation */}
                            <div className="mt-20 flex items-center justify-center gap-3">
                                <div className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-[1000] shadow-2xl shadow-orange-500/40 hover:scale-110 transition-transform cursor-pointer">1</div>
                                <div className="w-12 h-12 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-500 font-bold hover:bg-white hover:border-orange-500 hover:text-orange-600 cursor-pointer transition-all hover:shadow-xl hover:shadow-orange-500/5">2</div>
                                <div className="w-12 h-12 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-500 font-bold hover:bg-white hover:border-orange-500 hover:text-orange-600 cursor-pointer transition-all hover:shadow-xl hover:shadow-orange-500/5">3</div>
                                <div className="w-12 h-12 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/5">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
