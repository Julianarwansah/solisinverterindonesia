import { laravel } from '@/lib/laravel';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Artikel | Solis Inverter Indonesia',
    description: 'Baca berita dan artikel terbaru seputar Solis Inverter di Indonesia.',
};

async function getArticles() {
    try {
        return await laravel.articles.list();
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export default async function ArticlesPage() {
    const allArticles = await getArticles();
    const featuredArticle = allArticles[0];
    const otherArticles = allArticles.slice(1);

    const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_URL || 'http://localhost:8000';

    return (
        <main className="min-h-screen bg-white relative font-sans">
            {/* 1. Page Hero Section */}
            <section className="relative pt-20 pb-20 overflow-hidden z-10 bg-orange-50/50">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8 font-bold uppercase tracking-widest">
                            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600 font-black tracking-widest">Wawasan & Berita</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-[1000] text-gray-950 tracking-tight leading-[0.95] mb-10">
                            Wawasan <span className="text-orange-500">& Berita</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                            Temukan artikel terbaru, panduan teknis, dan berita seputar teknologi Inverter Solis dan masa depan energi tenaga surya.
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-10 bg-white w-full">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
                    {allArticles.length === 0 ? (
                        <div className="text-center py-32 bg-gray-50 rounded-[60px] border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-400 font-bold text-xl">Belum ada artikel yang dipublikasikan.</p>
                        </div>
                    ) : (
                        <div className="space-y-32">
                            {/* 2. Featured Article Section */}
                            {featuredArticle && (
                                <section>
                                    <div className="inline-flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-10">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                        Artikel Terbaru
                                    </div>
                                    <Link href={`/artikel/${featuredArticle.slug}`} className="group relative block rounded-[60px] bg-gray-950 overflow-hidden shadow-2xl">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                                            <div className="lg:col-span-7 aspect-[16/10] relative overflow-hidden">
                                                <Image
                                                    src={featuredArticle.images && featuredArticle.images.length > 0 ? (featuredArticle.images[0].startsWith('http') ? featuredArticle.images[0] : `${baseUrl}/storage/${featuredArticle.images[0]}`) : '/images/about_main.webp'}
                                                    alt={featuredArticle.title}
                                                    fill
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/20 to-transparent lg:hidden" />
                                            </div>
                                            <div className="lg:col-span-5 p-12 md:p-20 relative z-10">
                                                <div className="mb-10">
                                                    {featuredArticle.tags && Array.isArray(featuredArticle.tags) && featuredArticle.tags.slice(0, 1).map((tag: string, i: number) => (
                                                        <span key={i} className="px-5 py-2 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                                                    {featuredArticle.title}
                                                </h2>
                                                <p className="text-slate-400 text-lg md:text-xl font-medium line-clamp-3 mb-12 leading-relaxed">
                                                    {featuredArticle.short_description}
                                                </p>
                                                <div className="flex items-center gap-4 text-orange-500 font-black uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                                                    Baca Selengkapnya
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </section>
                            )}

                            {/* 3. Other Articles Grid */}
                            {otherArticles.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-16">
                                        <div className="flex items-center gap-3">
                                            <span className="w-12 h-0.5 bg-orange-500" />
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Arsip Berita</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                        {otherArticles.map((article: any) => (
                                            <Link key={article.id} href={`/artikel/${article.slug}`} className="group flex flex-col h-full bg-white rounded-[40px] border border-gray-100/50 p-4 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500">
                                                <div className="aspect-[16/10] relative mb-8 rounded-[32px] overflow-hidden">
                                                    <Image
                                                        src={article.images && article.images.length > 0 ? (article.images[0].startsWith('http') ? article.images[0] : `${baseUrl}/storage/${article.images[0]}`) : '/images/about_main.webp'}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="px-6 pb-8 flex flex-col flex-1">
                                                    <div className="flex gap-2 mb-6">
                                                        {article.tags && Array.isArray(article.tags) && article.tags.slice(0, 2).map((tag: string, i: number) => (
                                                            <span key={i} className="text-[10px] font-[1000] uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <h3 className="text-2xl font-black text-gray-950 mb-4 tracking-tight leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-gray-500 font-medium line-clamp-3 mb-8 leading-relaxed">
                                                        {article.short_description}
                                                    </p>
                                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-orange-600 transition-colors">
                                                        Baca Selengkapnya
                                                        <svg className="w-5 h-5 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
