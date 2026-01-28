import ArticleForm from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-[1000] text-gray-950 mb-4 tracking-tight">Tulis Artikel Baru</h1>
                <p className="text-xl font-medium text-gray-500 max-w-2xl">Bagikan wawasan dan berita terbaru Solis Indonesia kepada pembaca.</p>
            </div>

            <ArticleForm />
        </div>
    );
}
