import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';

async function getFeaturedProducts() {
    try {
        const products = await directus.request(readItems('products', {
            fields: ['*', { images: ['*', { directus_files_id: ['*'] }] }] as any,
            limit: 6,
            sort: ['-date_created'] as any, // Sort by date created desc
        }));
        return products as any[];
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
}

export default async function FeaturedProducts() {
    const dbProducts = await getFeaturedProducts();

    // Placeholder data for development/demo
    const placeholderProducts = [
        {
            id: 'p1',
            name: 'Solis-1P5K-4G',
            slug: 'solis-1p5k-4g',
            description: 'Single phase inverter dengan efisiensi 98.1%. Cocok untuk residensial.',
            images: [],
            tags: ['Best Seller']
        },
        {
            id: 'p2',
            name: 'Solis-3P10K-4G',
            slug: 'solis-3p10k-4g',
            description: 'Three phase inverter untuk komersial dan industri ringan. Dual MPPT.',
            images: [],
            tags: ['New']
        },
        {
            id: 'p3',
            name: 'Solis-mini-3000-4G',
            slug: 'solis-mini-3000-4g',
            description: 'Inverter kompak untuk sistem PLTS atap kecil. Ringan dan mudah instalasi.',
            images: [],
            tags: ['Residential']
        },
        {
            id: 'p4',
            name: 'Solis-110K-5G',
            slug: 'solis-110k-5g',
            description: 'High power inverter untuk proyek utilitas skala besar. Efisiensi maksimum.',
            images: [],
            tags: ['Industrial']
        },
        {
            id: 'p5',
            name: 'S5-GR3P10K',
            slug: 's5-gr3p10k',
            description: 'Generasi ke-5 inverter 3 phase. Mendukung modul PV berdaya tinggi.',
            images: [],
            tags: ['Gen 5']
        },
        {
            id: 'p6',
            name: 'Solis-RAI-3K-48ES-5G',
            slug: 'solis-rai-3k-48es-5g',
            description: 'AC coupled inverter untuk retrofit sistem penyimpanan baterai.',
            images: [],
            tags: ['Hybrid']
        }
    ];

    const products = dbProducts.length > 0 ? dbProducts : placeholderProducts;

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
                    {products.map((product) => (
                        <Link
                            href={`/produk/${product.slug}`}
                            key={product.id}
                            className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] relative mb-6 rounded-2xl overflow-hidden bg-slate-50 group-hover:bg-orange-50/50 transition-colors">
                                {product.images && product.images.length > 0 && product.images[0]?.directus_files_id ? (
                                    <Image
                                        src={`http://localhost:8055/assets/${product.images[0].directus_files_id.id}`}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-slate-300 font-medium bg-slate-100">
                                        <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs uppercase tracking-wider">Tanpa Gambar</span>
                                    </div>
                                )}

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
                    ))}
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
