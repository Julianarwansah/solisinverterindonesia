import { laravel } from '@/lib/laravel';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import MobileCategoryFilter from '@/components/MobileCategoryFilter';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getAllCategories() {
    try {
        return await laravel.products.categories();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function getCategoryData(slug: string) {
    try {
        return await laravel.products.category(slug);
    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

export async function generateStaticParams() {
    console.log('Generating static params for categories via Laravel...');
    try {
        const categories = await laravel.products.categories();
        return categories.map((cat: any) => ({
            slug: cat.slug,
        }));
    } catch (e) {
        console.error('Error in generateStaticParams for categories:', e);
        return [];
    }
}

export const dynamicParams = false;

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const currentPage = 1;
    const itemsPerPage = 12;

    const [data, allCategories] = await Promise.all([
        getCategoryData(slug),
        getAllCategories(),
    ]);

    if (!data || !data.category) {
        notFound();
    }

    const { category, products } = data;
    const totalProducts = allCategories.length;

    return (
        <div className="min-h-screen bg-white relative overflow-x-hidden">
            {/* Page Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden z-10 bg-orange-50/50">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
                            <Link href="/produk" className="hover:text-orange-600 transition-colors">Katalog</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600 font-black">{category.name}</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8 capitalize">
                            {category.name}
                        </h1>
                        <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed">
                            {category.description || `Menampilkan koleksi produk terbaik kami dalam kategori ${category.name}.`}
                        </p>
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
                    <MobileCategoryFilter categories={allCategories} currentSlug={slug} totalProducts={totalProducts} />
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
                                    categories={allCategories as any[]}
                                    totalProducts={totalProducts}
                                    currentSlug={slug}
                                />
                            </div>
                        </aside>

                        <div className="lg:col-span-9">
                            {products.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                                    <div className="text-gray-400 font-medium mb-4">Belum ada produk dalam kategori ini.</div>
                                    <Link href="/produk" className="text-orange-600 font-bold hover:underline">
                                        Lihat semua produk →
                                    </Link>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
