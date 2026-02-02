import directus from '@/lib/directus';
import { readItems, readItem } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    try {
        const products = await directus.request(readItems('products', {
            filter: { slug: { _eq: slug } },
            fields: ['name', 'meta_title', 'meta_description'],
            limit: 1
        }));

        if (!products || products.length === 0) return { title: 'Produk Tidak Ditemukan' };
        const product = products[0];

        return {
            title: product.meta_title || product.name,
            description: product.meta_description || `Detail produk ${product.name} dari Solis Inverter Indonesia.`,
        };
    } catch (e) {
        return { title: 'Error' };
    }
}

async function getProduct(slug: string) {
    try {
        const products = await directus.request(readItems('products', {
            filter: { slug: { _eq: slug } },
            fields: ['id', 'name', 'slug', 'description', 'image', 'tags', 'meta_title', 'meta_description', { category: ['name'] }, { images: [{ directus_files_id: ['id'] }] }] as any,
            limit: 1
        })) as any[];

        return products[0];
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default async function ProductDetail({ params }: Props) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) notFound();

    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://127.0.0.1:8055';

    // Collect all unique images
    const images: string[] = [];

    // 1. Featured Image
    if (product.image) {
        images.push(`${baseUrl}/assets/${product.image}?format=webp&quality=80`);
    }

    // 2. Gallery Images
    product.images?.forEach((img: any) => {
        if (img.directus_files_id?.id) {
            const url = `${baseUrl}/assets/${img.directus_files_id.id}?format=webp&quality=80`;
            if (!images.includes(url)) {
                images.push(url);
            }
        }
    });

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20 overflow-x-hidden w-full">
            {/* Breadcrumb Header */}
            <div className="bg-white border-b border-gray-100 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                        <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/produk" className="hover:text-orange-600 transition-colors">Produk</Link>
                        <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">

                    {/* Left Column: Gallery */}
                    <ProductGallery images={images} productName={product.name} />

                    {/* Right Column: Details */}
                    <div className="space-y-8">
                        <div>
                            {product.category && (
                                <Link
                                    href={`/kategori/${product.category.name}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 mb-4 hover:bg-orange-100 transition-colors"
                                >
                                    {product.category.name}
                                </Link>
                            )}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[900] text-gray-900 tracking-tight leading-[1.1] mb-6">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Official Warranty
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                        {/* Actions */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Tertarik dengan produk ini?</h3>
                                <p className="text-gray-500 text-sm">Tim ahli kami siap membantu Anda memilih solusi inverver terbaik.</p>
                            </div>

                            <a
                                href={`https://wa.me/6281258885595?text=Halo%20Solis%20Indonesia,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`}
                                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/30 hover:-translate-y-0.5"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Konsultasi via WhatsApp
                            </a>
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="pt-6 border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag: any, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Re-export the client component to be safe, though not strictly needed in all setups
import ProductGallery from '@/components/ProductGallery';
