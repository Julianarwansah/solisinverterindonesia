import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

async function getProducts() {
  try {
    const products = await directus.request(readItems('products', {
      fields: ['*', { images: ['*', { directus_files_id: ['*'] }] }] as any,
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

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

export const metadata: Metadata = {
  title: 'Katalog Produk Solis Inverter',
  description: 'Temukan berbagai tipe inverter Solis terbaik untuk kebutuhan solar panel Anda.',
};

import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import CategorySection from '@/components/CategorySection';
import FeaturesBento from '@/components/FeaturesBento';

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]) as [any[], any[]];

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <CategorySection categories={categories} />
      <FeaturesBento />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20 flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-orange-900 tracking-tight">Katalog Produk Terpopuler</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg underline decoration-orange-500 decoration-2 underline-offset-4">Premium Inverter Technology for Solar Solutions</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed text-gray-400 font-medium">
            Belum ada produk yang ditampilkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id} className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {product.images && product.images.length > 0 && (
                  <div className="aspect-square relative mb-6 bg-gray-50 rounded-2xl overflow-hidden p-4 group-hover:bg-orange-50 transition-colors">
                    {typeof product.images[0].directus_files_id === 'object' && product.images[0].directus_files_id !== null && (
                      <Image
                        src={`http://localhost:8055/assets/${product.images[0].directus_files_id.id}`}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform group-hover:scale-110"
                      />
                    )}
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{product.name}</h2>
                <div className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(product.tags) && product.tags.slice(0, 2).map((tag: any, i: number) => (
                      <span key={i} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-orange-600 font-bold group-hover:translate-x-1 transition-transform">Detail →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
