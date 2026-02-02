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
            fields: ['id', 'name', 'slug', 'description', 'image', 'tags', 'meta_title', 'meta_description', { category: ['name'] }] as any,
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

    // Use the featured image if available, otherwise fallback to the first gallery image
    const featuredImageId = product.image || product.images?.[0]?.directus_files_id?.id;
    // If we used the featured image, we show all gallery images. 
    // If we fell back to the first gallery image, we show the rest of the gallery.
    const galleryImages = product.image
        ? product.images
        : product.images?.slice(1);

    return (
        <div className="min-h-screen p-8 sm:p-20">
            <main className="max-w-6xl mx-auto">
                <Link href="/" className="text-blue-600 hover:underline inline-block mb-8">← Kembali ke Katalog</Link>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Gallery */}
                    <div className="flex-1 space-y-4">
                        {featuredImageId && (
                            <div className="aspect-square relative rounded-2xl overflow-hidden border shadow-sm">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://127.0.0.1:8055'}/assets/${featuredImageId}?format=webp&quality=80`}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-4 gap-4">
                            {galleryImages?.map((img: any, i: number) => (
                                <div key={i} className="aspect-square relative rounded-lg overflow-hidden border">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://127.0.0.1:8055'}/assets/${img.directus_files_id.id}?format=webp&quality=80`}
                                        alt={`${product.name} alternate`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
                        {product.category && (
                            <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium border border-blue-100">
                                {product.category.name}
                            </span>
                        )}

                        <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />

                        <div className="pt-8 border-t space-y-4">
                            <h3 className="font-semibold text-lg">Tertarik dengan produk ini?</h3>
                            <a
                                href={`https://wa.me/6281258885595?text=Halo%20Solis%20Indonesia,%20saya%20ingin%20tanya%20tentang%20produk%20${encodeURIComponent(product.name)}`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 w-full md:w-auto"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Pesan via WhatsApp
                            </a>
                        </div>

                        <div className="flex gap-2 pt-4">
                            {product.tags?.map((tag: any, i: number) => (
                                <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
