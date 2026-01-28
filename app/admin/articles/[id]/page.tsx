import directus from '@/lib/directus';
import { readItem } from '@directus/sdk';
import ArticleForm from '@/components/admin/ArticleForm';
import { notFound } from 'next/navigation';

async function getArticle(id: string) {
    try {
        return await directus.request(readItem('articles', id, {
            fields: ['*'] as any,
        }));
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export default async function EditArticlePage({ params }: any) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-[1000] text-gray-950 mb-4 tracking-tight">Edit Artikel</h1>
                <p className="text-xl font-medium text-gray-500 max-w-2xl">Perbarui konten artikel <span className="text-orange-600 font-black">{article.title}</span>.</p>
            </div>

            <ArticleForm initialData={article as any} />
        </div>
    );
}
