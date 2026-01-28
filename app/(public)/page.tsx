import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { Metadata } from 'next';

async function getCategories(): Promise<any[]> {
  try {
    const categories = await directus.request(readItems('product_categories', {
      fields: ['id', 'name', 'slug', 'description', 'thumbnail'] as any,
    }));
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Distributor Resmi Solis Inverter Indonesia',
  description: 'Solis Inverter Indonesia: Distributor resmi penyedia inverter surya on-grid, off-grid, dan hybrid. Garansi resmi, layanan purna jual terpercaya, dan teknisi bersertifikat.',
  alternates: {
    canonical: 'https://solisinverterindonesia.com',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://solisinverterindonesia.com/#organization',
      name: 'Solis Inverter Indonesia',
      url: 'https://solisinverterindonesia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://solisinverterindonesia.com/logo.png', // Fallback or actual logo URL
        width: 112,
        height: 112,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-5888-5595',
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['en', 'id'],
      },
      sameAs: [
        'https://www.facebook.com/solisinverterindonesia',
        'https://www.instagram.com/solisinverterindonesia',
        // Add other social links if available
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://solisinverterindonesia.com/#website',
      url: 'https://solisinverterindonesia.com',
      name: 'Solis Inverter Indonesia',
      description: 'Distributor Resmi & Pusat Layanan Solis Inverter di Indonesia',
      publisher: {
        '@id': 'https://solisinverterindonesia.com/#organization',
      },
      inLanguage: 'id-ID',
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AboutSection />
      <CategorySection categories={categories} />
      <FeaturesBento />
      <FeaturedProducts />
      <ContactSection />
    </div>
  );
}

