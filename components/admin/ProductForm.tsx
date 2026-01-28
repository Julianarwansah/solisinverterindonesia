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
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { saveProduct } = useProductActions();

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
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column */}
                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Nama Produk</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300"
                            placeholder="Contoh: Solis 5G Single Phase Inverter"
                        />
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

                    <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Kategori</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 appearance-none"
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
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
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Deskripsi Produk</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={5}
                            className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300 resize-none"
                            placeholder="Jelaskan fitur dan spesifikasi produk..."
                        />
                    </div>
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
                    ) : (initialData ? 'Simpan Perubahan' : 'Tambah Produk Sekarang')}
                </button>
            </div>
        </form>
    );
}
