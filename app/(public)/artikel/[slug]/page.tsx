import { laravel, getImageUrl } from '@/lib/laravel';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    try {
        const response = await laravel.articles.list(1, 100);
        return response.data.map((article: any) => ({
            slug: article.slug,
        }));
    } catch (error) {
        console.error('Error generating static params for articles:', error);
        return [];
    }
}

interface Props {
    params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
    try {
        return await laravel.articles.show(slug);
    } catch (error) {
        console.error('Error fetching article detail:', error);
        return null;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return { title: 'Artikel Tidak Ditemukan' };

    const ogImage = getImageUrl(article.og_image);

    return {
        title: `${article.seo_title || article.title} | Solis Inverter Indonesia`,
        description: article.seo_description || article.excerpt,
        openGraph: {
            images: ogImage ? [ogImage] : [],
        },
    };
}

export default async function ArticleDetailPage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    const imageUrl = getImageUrl(article.featured_image);

    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Header / Breadcrumb */}
            <div className="bg-orange-50/50 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/artikel" className="inline-flex items-center gap-2 text-orange-600 font-bold text-sm mb-8 hover:gap-3 transition-all">
                        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        Kembali ke Blog
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-[1000] text-gray-950 tracking-tight leading-tight">
                        {article.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 pt-12">
                {/* Featured Image */}
                {imageUrl && (
                    <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl mb-16">
                        <Image
                            src={imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Article Content */}
                <article className="prose prose-lg prose-orange max-w-none prose-headings:font-black prose-headings:tracking-tight prose-img:rounded-3xl prose-a:text-orange-600">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </article>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <div className="flex flex-wrap gap-3">
                            {article.tags.map((tag: string, i: number) => (
                                <span key={i} className="px-5 py-2 bg-gray-50 text-gray-500 rounded-full text-xs font-bold uppercase tracking-widest">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
