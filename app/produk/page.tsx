import { laravel } from '@/lib/laravel';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import MobileCategoryFilter from '@/components/MobileCategoryFilter';

export const metadata: Metadata = {
    title: 'Katalog Produk Solis Inverter | Semua Tipe',
    description: 'Lihat katalog lengkap Solis Inverter. Temukan inverter yang tepat untuk sistem panel surya Anda, dari residensial hingga skala industri.',
};

async function getCategories() {
    try {
        return await laravel.products.categories();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function getProducts(limit: number = 12) {
    try {
        return await laravel.products.list(limit);
    } catch (error: any) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function ProductsPage() {
    const currentPage = 1;
    const itemsPerPage = 12;

    const [products, categories] = await Promise.all([
        getProducts(itemsPerPage),
        getCategories(),
    ]);

    const totalProductsCount = products.length; // Simplified for now

    return (
        <div className="min-h-screen bg-white relative overflow-x-hidden">
            {/* Page Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden z-10 bg-orange-50/50">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
                            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600 font-black">Produk</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8 capitalize">
                            Katalog Produk
                        </h1>
                    </div>
                </div>
            </section>

            <div className="bg-white border-b border-gray-100 shadow-sm relative z-20">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-orange-500 rounded-full" />
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Katalog Produk</p>
                                <p className="text-gray-900 text-lg md:text-xl font-[1000] tracking-tight">Menampilkan {products.length} pilihan terbaik</p>
                            </div>
                        </div>
                        <SortDropdown />
                    </div>
                    <MobileCategoryFilter categories={categories} currentSlug="" totalProducts={totalProductsCount} />
                </div>
            </div>

            <div className="relative z-10 bg-white w-full">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <aside className="hidden lg:block lg:col-span-3 space-y-12 h-fit">
                            <div className="bg-gray-50/50 rounded-[40px] p-8 border border-gray-100/50">
                                <h3 className="text-xs font-[1000] text-gray-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-orange-500/30" />
                                    Kategori
                                </h3>
                                <CategorySidebar
                                    categories={categories}
                                    totalProducts={totalProductsCount}
                                    currentSlug=""
                                />
                            </div>
                        </aside>

                        <div className="lg:col-span-9">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                                {products.map((product: any) => (
                                    <div key={product.id} className="group bg-white rounded-[40px] border border-gray-100/50 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.12)] transition-all duration-700 flex flex-col overflow-hidden">
                                        <Link href={`/produk/${product.slug}`} className="aspect-square relative overflow-hidden bg-gray-50/50 group-hover:bg-white transition-colors duration-700">
                                            {product.images && product.images.length > 0 ? (
                                                <Image
                                                    src={product.images[0].startsWith('http') ? product.images[0] : `${process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000'}/storage/${product.images[0]}`}
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
                                        </Link>
                                        <div className="p-10 flex flex-col flex-1">
                                            <div className="mb-6">
                                                <Link href={`/produk/${product.slug}`} className="text-xl sm:text-2xl font-[1000] text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 block mb-3">
                                                    {product.name}
                                                </Link>
                                                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                                    {product.short_description || 'Deskripsi produk kualitas tinggi.'}
                                                </p>
                                            </div>
                                            <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                                                <span className="text-xl font-black text-gray-950">Hubungi Kami</span>
                                                <Link href={`/produk/${product.slug}`} className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Suspense fallback={null}>
                                <Pagination
                                    totalItems={products.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
