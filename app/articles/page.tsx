import directus, { Article } from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Articles | Solis Inverter Indonesia',
    description: 'Read the latest news and articles about Solis Inverters in Indonesia.',
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
        <div className="min-h-screen p-8 sm:p-20">
            <main className="max-w-4xl mx-auto flex flex-col gap-8">
                <Link href="/" className="text-blue-600 hover:underline">← Back to Products</Link>
                <h1 className="text-4xl font-bold">Latest Articles</h1>

                {articles.length === 0 ? (
                    <p>No articles found.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-12">
                        {articles.map((article: any) => (
                            <article key={article.id} className="group border-b pb-12">
                                {article.featured_image && (
                                    <div className="aspect-video relative mb-6 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={`http://localhost:8055/assets/${typeof article.featured_image === 'object' ? article.featured_image.id : article.featured_image}`}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {article.tags?.map((tag: any, i: number) => (
                                            <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-gray-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="text-blue-600 font-bold hover:translate-x-1 transition-transform">
                                        Read More →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
