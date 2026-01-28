'use client';

import { useState, useEffect } from 'react';
import { useProductActions } from '@/lib/admin-actions';
import { Product, Category } from '@/lib/directus';

interface ProductFormProps {
    initialData?: Product;
    categories: Category[];
}

export default function ProductForm({ initialData, categories }: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        status: initialData?.status || 'draft',
        category: initialData?.category ? (typeof initialData.category === 'string' ? initialData.category : initialData.category.id) : '',
        description: initialData?.description || '',
        meta_title: initialData?.meta_title || '',
        meta_description: initialData?.meta_description || '',
        keywords: initialData?.keywords || [] as string[],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { saveProduct } = useProductActions();
    const [keywordInput, setKeywordInput] = useState('');

    const handleAddKeyword = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && keywordInput.trim()) {
            e.preventDefault();
            if (!formData.keywords.includes(keywordInput.trim())) {
                setFormData({ ...formData, keywords: [...formData.keywords, keywordInput.trim()] });
            }
            setKeywordInput('');
        }
    };

    const removeKeyword = (tag: string) => {
        setFormData({ ...formData, keywords: formData.keywords.filter(k => k !== tag) });
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

        const result = await saveProduct(formData, initialData?.id);

        if (!result.success) {
            setError(result.error || 'Terjadi kesalahan saat menyimpan produk.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Left Column */}
                <div className="space-y-6 md:space-y-8">
                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Nama Produk</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 shadow-sm focus:shadow-xl focus:shadow-orange-500/5 text-sm md:text-base"
                            placeholder="Contoh: Solis 5G Single Phase Inverter"
                        />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                            className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 text-sm md:text-base"
                        />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Kategori</label>
                        <div className="relative group">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                                className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 appearance-none text-sm md:text-base"
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 md:space-y-8">
                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Status</label>
                        <div className="flex gap-4 p-2 bg-gray-50 rounded-[24px] md:rounded-[32px]">
                            {['draft', 'published'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status: s })}
                                    className={`flex-1 py-4 md:py-5 px-6 rounded-[18px] md:rounded-[24px] font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${formData.status === s
                                        ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20 active:scale-95'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-white active:scale-95'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Deskripsi Produk</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={5}
                            className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 resize-none text-sm md:text-base shadow-sm focus:shadow-xl focus:shadow-orange-500/5"
                            placeholder="Jelaskan fitur dan spesifikasi produk..."
                        />
                    </div>
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
                        <p className="text-sm font-medium text-gray-400">Optimalkan produk ini agar lebih mudah ditemukan di mesin pencari.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-3 md:space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Meta Title</label>
                            <input
                                type="text"
                                value={formData.meta_title}
                                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                className="w-full px-8 md:px-10 py-5 md:py-6 bg-gray-50 border border-transparent rounded-[24px] md:rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 text-sm md:text-base shadow-sm"
                                placeholder="Judul untuk tampilan Google..."
                            />
                        </div>

                        <div className="space-y-3 md:space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Keywords</label>
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
                                    {formData.keywords.map((tag) => (
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
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Meta Description</label>
                        <textarea
                            value={formData.meta_description}
                            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
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
                    ) : (initialData ? 'Simpan Perubahan' : 'Terbitkan Produk')}
                </button>
            </div>
        </form>
    );
}
