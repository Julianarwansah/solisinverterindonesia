'use client';

import { useState, useEffect } from 'react';
import { useCategoryActions } from '@/lib/admin-actions';
import { Category } from '@/lib/directus';

interface CategoryFormProps {
    initialData?: Category;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        seo_title: initialData?.seo_title || '',
        seo_description: initialData?.seo_description || '',
        seo_keywords: initialData?.seo_keywords || [] as string[],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { saveCategory } = useCategoryActions();
    const [keywordInput, setKeywordInput] = useState('');

    const handleAddKeyword = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && keywordInput.trim()) {
            e.preventDefault();
            if (!formData.seo_keywords.includes(keywordInput.trim())) {
                setFormData({ ...formData, seo_keywords: [...formData.seo_keywords, keywordInput.trim()] });
            }
            setKeywordInput('');
        }
    };

    const removeKeyword = (tag: string) => {
        setFormData({ ...formData, seo_keywords: formData.seo_keywords.filter(k => k !== tag) });
    };

    // Auto-generate slug from name
    useEffect(() => {
        if (!initialData && formData.name) {
            const slug = formData.name
                .toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.name, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await saveCategory(formData, initialData?.id);

        if (!result.success) {
            setError(result.error || 'Terjadi kesalahan saat menyimpan kategori.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100 flex flex-col gap-8 md:gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Nama Kategori</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 text-sm md:text-base shadow-sm focus:shadow-xl focus:shadow-orange-500/5"
                            placeholder="Contoh: On-Grid Inverters"
                        />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                            className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 text-sm md:text-base shadow-sm focus:shadow-xl focus:shadow-orange-500/5"
                        />
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Deskripsi Singkat</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 resize-none text-sm md:text-base shadow-sm focus:shadow-xl focus:shadow-orange-500/5"
                        placeholder="Berikan sedikit penjelasan tentang kategori ini..."
                    />
                </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100 space-y-8 md:space-y-10">
                <div className="flex items-center gap-6 mb-2">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-[1000] text-gray-950 tracking-tight">Konfigurasi SEO</h3>
                        <p className="text-sm font-medium text-gray-400">Optimalkan kategori ini agar lebih mudah ditemukan di mesin pencari.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-3 md:space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">SEO Title</label>
                            <input
                                type="text"
                                value={formData.seo_title}
                                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 text-sm md:text-base shadow-sm"
                                placeholder="Judul untuk tampilan Google..."
                            />
                        </div>

                        <div className="space-y-3 md:space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">SEO Keywords</label>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                    onKeyDown={handleAddKeyword}
                                    className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 text-sm md:text-base shadow-sm"
                                    placeholder="Tekan Enter untuk menambah keyword..."
                                />
                                <div className="flex flex-wrap gap-2 px-4">
                                    {formData.seo_keywords.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-xs font-black flex items-center gap-2 group hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                                            onClick={() => removeKeyword(tag)}
                                        >
                                            {tag}
                                            <svg className="w-3 h-3 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">SEO Description</label>
                        <textarea
                            value={formData.seo_description}
                            onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                            rows={6}
                            className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 resize-none text-sm md:text-base shadow-sm focus:shadow-xl focus:shadow-orange-500/5"
                            placeholder="Deskripsi singkat yang akan muncul di hasil pencarian..."
                        />
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-8 bg-red-50 border border-red-100 text-red-600 rounded-[40px] text-sm font-bold flex items-center gap-6 animate-in zoom-in-95 duration-300">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    {error}
                </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 md:gap-6">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="w-full sm:w-auto px-10 py-5 md:py-6 bg-white border border-gray-100 text-gray-500 font-black rounded-3xl md:rounded-[32px] hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95 text-sm md:text-base"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto px-12 py-5 md:py-6 bg-gray-950 text-white font-black rounded-3xl md:rounded-[32px] hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-600/20 active:scale-95 flex items-center justify-center gap-4 text-sm md:text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menyimpan...
                        </>
                    ) : (initialData ? 'Simpan Perubahan' : 'Terbitkan Kategori')}
                </button>
            </div>
        </form>
    );
}
