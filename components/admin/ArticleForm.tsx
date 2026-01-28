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
        seo_title: initialData?.seo_title || '',
        seo_description: initialData?.seo_description || '',
        canonical_url: initialData?.canonical_url || '',
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
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Main Content Area */}
            <div className="flex-1 space-y-8 w-full">
                {/* Title Section */}
                <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
                    <label className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] ml-6 mb-4 block">Judul Artikel</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-8 md:px-10 py-6 md:py-8 bg-gray-50 border border-transparent rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-[1000] text-2xl md:text-3xl lg:text-4xl text-gray-950 placeholder:text-gray-200 shadow-sm focus:shadow-xl focus:shadow-orange-500/5"
                        placeholder="Masukkan judul artikel..."
                    />
                    <div className="mt-6 flex items-center gap-4 px-6">
                        <span className="text-xs font-bold text-gray-400">Permalink:</span>
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                            <span className="text-xs font-medium text-gray-400">/blog/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="bg-transparent border-none outline-none text-xs font-bold text-orange-600 w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Meta Box */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-10 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Konten Artikel</h3>
                        <div className="flex gap-2">
                            <button type="button" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-500 hover:text-gray-950 transition-colors">Visual</button>
                            <button type="button" className="px-4 py-2 bg-gray-100 border border-transparent rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-950 transition-colors">Code</button>
                        </div>
                    </div>
                    <div className="p-2 border-b border-gray-50 flex items-center gap-1 bg-white">
                        {['B', 'I', 'U', 'Link', 'Quote', 'List', 'Img'].map(tool => (
                            <button key={tool} type="button" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all font-serif italic font-bold">{tool[0]}</button>
                        ))}
                    </div>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                        rows={18}
                        className="w-full px-10 py-8 bg-white border-none outline-none transition-all font-medium text-gray-800 placeholder:text-gray-200 resize-none text-lg leading-relaxed"
                        placeholder="Tuliskan isi lengkap artikel di sini..."
                    />
                </div>

                {/* Excerpt Meta Box */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Ringkasan (Excerpt)</h3>
                    </div>
                    <div className="p-8">
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            required
                            rows={3}
                            className="w-full px-8 md:px-10 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-200 resize-none text-sm md:text-base leading-relaxed"
                            placeholder="Ringkasan singkat untuk tampilan kartu..."
                        />
                        <p className="mt-3 text-[10px] font-bold text-gray-400 italic px-6 uppercase tracking-widest">Excerpts are optional hand-crafted summaries of your content.</p>
                    </div>
                </div>

                {/* SEO Configuration Meta Box */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-4">
                        <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Konfigurasi SEO</h3>
                    </div>
                    <div className="p-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">SEO Title</label>
                                    <input
                                        type="text"
                                        value={formData.seo_title}
                                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                        className="w-full px-8 md:px-10 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-200 text-sm md:text-base"
                                        placeholder="Judul untuk tampilan Google..."
                                    />
                                    <div className="px-6 flex justify-between">
                                        <span className="text-[10px] font-bold text-gray-400">Target: 60 chars</span>
                                        <span className="text-[10px] font-bold text-orange-500">{formData.seo_title.length}/60</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Canonical URL</label>
                                    <input
                                        type="url"
                                        value={formData.canonical_url}
                                        onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                                        className="w-full px-8 md:px-10 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-200 text-sm md:text-base"
                                        placeholder="https://example.com/artikel-asli"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">SEO Description</label>
                                <textarea
                                    value={formData.seo_description}
                                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                                    rows={8}
                                    className="w-full px-8 md:px-10 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-200 resize-none text-sm md:text-base leading-relaxed"
                                    placeholder="Deskripsi singkat untuk hasil pencarian..."
                                />
                                <div className="px-6 flex justify-between">
                                    <span className="text-[10px] font-bold text-gray-400">Target: 160 chars</span>
                                    <span className="text-[10px] font-bold text-orange-500">{formData.seo_description.length}/160</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="w-full lg:w-96 space-y-8 sticky top-8">
                {/* Publish Meta Box */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Penerbitan</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className={`w-3 h-3 rounded-full ${formData.status === 'published' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]' : 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.5)] animate-pulse'}`}></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Status:</span>
                            </div>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="bg-gray-50 border-none outline-none text-xs font-black text-gray-950 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[10px] font-bold uppercase tracking-widest">Terbit:</span>
                            </div>
                            <span className="text-[10px] font-black text-gray-950 uppercase tracking-widest">Segera</span>
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex gap-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="flex-1 py-4 bg-gray-50 text-gray-500 font-black rounded-2xl hover:bg-gray-100 hover:text-gray-950 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 bg-gray-950 text-white font-black rounded-2xl hover:bg-orange-600 transition-all hover:shadow-xl hover:shadow-orange-600/20 active:scale-95 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest disabled:opacity-50"
                            >
                                {loading ? '...' : (initialData ? 'Update' : 'Terbitkan')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Image Meta Box */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Gambar Unggulan</h3>
                    </div>
                    <div className="p-8">
                        <div className="aspect-[16/10] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-4 group hover:border-orange-500 hover:bg-orange-50/30 transition-all cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-300 group-hover:text-orange-500 transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-orange-600">Set Featured Image</span>
                        </div>
                    </div>
                </div>

                {/* Categories/Tags could go here too */}
            </div>

            {/* Global Error Overaly */}
            {error && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 p-6 bg-red-600 text-white rounded-3xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500 z-[100]">
                    <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold">{error}</span>
                </div>
            )}
        </form>
    );

        </form >
    );
}
