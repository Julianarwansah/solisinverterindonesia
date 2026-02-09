import { laravel } from '@/lib/laravel';
import Image from 'next/image';
import Link from 'next/link';

async function getFeaturedProducts() {
    try {
        const response = await laravel.products.list(1, 6);
        return response.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}

export default async function FeaturedProducts() {
    const dbProducts = await getFeaturedProducts();

    // Placeholder data for development/demo (optional fallback)
    const placeholderProducts = [
        {
            id: 'p1',
            name: 'Solis-1P5K-4G',
            slug: 'solis-1p5k-4g',
            description: 'Single phase inverter dengan efisiensi 98.1%. Cocok untuk residensial.',
            images: [],
            tags: ['Best Seller']
        },
        // ... (keep usage simple or just use empty array if dbProducts is empty, but better to show something if needed)
    ];

    const products = dbProducts && dbProducts.length > 0 ? dbProducts : [];
    const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                        Produk Terpopuler
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Produk Pilihan <span className="text-orange-600">Terbaik</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Solusi inverter energi surya efisiensi tinggi untuk kebutuhan rumah tangga hingga industri.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {products.map((product: any) => {
                        let displayImage = '/placeholder.jpg';
                        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                            const firstImg = product.images[0];
                            if (typeof firstImg === 'string') {
                                displayImage = firstImg.startsWith('http') ? firstImg : `${baseUrl}/${firstImg}`;
                            } else if (firstImg.directus_files_id) {
                                displayImage = `${baseUrl}/assets/${firstImg.directus_files_id.id}`;
                            }
                        }

                        return (
                            <Link
                                href={`/produk/${product.slug}`}
                                key={product.id}
                                className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="aspect-[4/3] relative mb-6 rounded-2xl overflow-hidden bg-slate-50 group-hover:bg-orange-50/50 transition-colors">
                                    <Image
                                        src={displayImage}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Badge (if tags exist) */}
                                    {product.tags && product.tags.length > 0 && (
                                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm border border-slate-100">
                                            {typeof product.tags[0] === 'string' ? product.tags[0] : 'New'}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-4 flex-1 flex flex-col">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        {/* Description (Truncated) */}
                                        <div
                                            className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: product.description || '' }}
                                        />
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                                        <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                            Lihat Detail
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link
                        href="/produk"
                        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 active:scale-95"
                    >
                        <span>Lihat Semua Produk</span>
                        <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}
