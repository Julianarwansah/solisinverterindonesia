'use client';

import { useState, useEffect } from 'react';
import { useArticleActions } from '@/lib/admin-actions';
import { Article } from '@/lib/directus';

interface ArticleFormProps {
    initialData?: Article;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        status: initialData?.status || 'draft',
        content: initialData?.content || '',
        excerpt: initialData?.excerpt || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { saveArticle } = useArticleActions();

    // Auto-generate slug from title
    useEffect(() => {
        if (!initialData && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await saveArticle(formData, initialData?.id);

        if (!result.success) {
            setError(result.error || 'Terjadi kesalahan saat menyimpan artikel.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-10">
                {/* Status and Slug Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Status</label>
                        <div className="flex gap-4 p-2 bg-gray-50 rounded-[24px]">
                            {['draft', 'published'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status: s })}
                                    className={`flex-1 py-4 px-6 rounded-[18px] font-black uppercase tracking-widest text-[10px] transition-all ${formData.status === s
                                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                            className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300"
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Judul Artikel</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-8 py-6 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-[1000] text-2xl text-gray-950 placeholder:text-gray-200"
                        placeholder="Masukkan judul artikel yang menarik..."
                    />
                </div>

                {/* Excerpt */}
                <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Ringkasan (Excerpt)</label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        required
                        rows={3}
                        className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300 resize-none"
                        placeholder="Ringkasan singkat untuk tampilan kartu..."
                    />
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Konten Artikel (Markdown/HTML Support)</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={15}
                        className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300 resize-none"
                        placeholder="Tuliskan isi lengkap artikel di sini..."
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-[32px] text-sm font-bold flex items-center gap-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-6">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-10 py-5 bg-white border border-gray-100 text-gray-500 font-black rounded-3xl hover:bg-gray-50 transition-all active:scale-95"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-12 py-5 bg-gray-950 text-white font-black rounded-3xl hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-600/20 active:scale-95 flex items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menyimpan...
                        </>
                    ) : (initialData ? 'Simpan Perubahan' : 'Terbitkan Artikel Sekarang')}
                </button>
            </div>
        </form>
    );
}
