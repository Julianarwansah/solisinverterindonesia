import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
  title: 'Katalog Produk Solis Inverter',
  description: 'Temukan berbagai tipe inverter Solis terbaik untuk kebutuhan solar panel Anda.',
};

import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import CategorySection from '@/components/CategorySection';
import FeaturesBento from '@/components/FeaturesBento';
import FeaturedProducts from '@/components/FeaturedProducts';
import ContactSection from '@/components/ContactSection';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <CategorySection categories={categories} />
      <FeaturesBento />
      <FeaturedProducts />
      <ContactSection />
    </div>
  );
}

