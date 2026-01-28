import directus, { Article } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Artikel | Solis Inverter Indonesia',
    description: 'Baca berita dan artikel terbaru seputar Solis Inverter di Indonesia.',
};

async function getArticles(): Promise<Article[]> {
    try {
        const articles = await directus.request(readItems('articles', {
            fields: ['*', { featured_image: ['*'] }] as any,
            sort: ['-date_created' as any],
        })) as any[];
        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export default async function ArticlesPage() {
    const articles = await getArticles();

    return (
        <main className="min-h-screen bg-white relative">
            {/* Unified Background for Nav and Hero */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-orange-50/50 -z-0" />

            {/* Page Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden z-10">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[100px]" />

                {/* Decorative plus signs */}
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
                            <span className="text-orange-600 font-black">Artikel</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8 capitalize">
                            Wawasan <span className="text-orange-500">& Berita</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                            Temukan artikel terbaru, panduan teknis, dan berita seputar teknologi Inverter Solis dan energi tenaga surya di Indonesia.
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-8 py-20 relative z-10 bg-white">
                {articles.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">Artikel tidak ditemukan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {articles.map((article: any) => (
                            <div key={article.id} className="group flex flex-col">
                                {article.featured_image && (
                                    <div className="aspect-[16/10] relative mb-8 bg-gray-100 rounded-[32px] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                                        <Image
                                            src={`http://localhost:8055/assets/${typeof article.featured_image === 'object' ? article.featured_image.id : article.featured_image}`}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                )}
                                <div className="space-y-4 flex-1">
                                    <h2 className="text-3xl font-black text-gray-900 group-hover:text-orange-600 transition-colors leading-tight">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-500 line-clamp-2 text-lg leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 mt-auto">
                                        <div className="flex gap-2">
                                            {article.tags?.map((tag: any, i: number) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="flex items-center gap-2 text-gray-900 font-black hover:text-orange-600 hover:translate-x-2 transition-all">
                                            Baca Selengkapnya
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
