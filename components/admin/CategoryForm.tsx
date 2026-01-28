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
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { saveCategory } = useCategoryActions();

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
            <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100 grid grid-cols-1 gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Nama Kategori</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-10 py-6 bg-gray-50 border border-transparent rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300"
                            placeholder="Contoh: On-Grid Inverters"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            required
                            className="w-full px-10 py-6 bg-gray-50 border border-transparent rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Deskripsi Singkat</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-10 py-6 bg-gray-50 border border-transparent rounded-[32px] focus:bg-white focus:border-orange-500 outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 resize-none"
                        placeholder="Berikan sedikit penjelasan tentang kategori ini..."
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-8 bg-red-50 border border-red-100 text-red-600 rounded-[40px] text-sm font-bold flex items-center gap-6 animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-8">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-12 py-6 bg-white border border-gray-100 text-gray-400 font-bold rounded-[32px] hover:bg-gray-50 transition-all active:scale-95"
                >
                    Batalkan
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-16 py-6 bg-orange-600 text-white font-black rounded-[32px] hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95 flex items-center gap-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menyimpan...
                        </>
                    ) : (initialData ? 'Update Kategori' : 'Buat Kategori Baru')}
                </button>
            </div>
        </form>
    );
}
