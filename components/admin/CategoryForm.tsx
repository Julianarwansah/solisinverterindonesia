'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveCategoryAction, uploadFileAction } from '@/lib/admin-actions';
import { Category } from '@/lib/directus';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';

interface CategoryFormProps {
    initialData?: Category;
    categories: Category[];
}

export default function CategoryForm({ initialData, categories }: CategoryFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        parent_category: initialData?.parent_category ? (typeof initialData.parent_category === 'string' ? initialData.parent_category : initialData.parent_category.id) : '',
        display_type: initialData?.display_type || 'default',
        thumbnail: initialData?.thumbnail ? (typeof initialData.thumbnail === 'string' ? initialData.thumbnail : (initialData.thumbnail as any).id) : '',
        seo_title: initialData?.seo_title || '',
        seo_description: initialData?.seo_description || '',
        seo_keywords: initialData?.seo_keywords || [] as string[],
    });

    const [categoriesList, setCategoriesList] = useState<Category[]>(categories || []);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const [keywordInput, setKeywordInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync categories from props
    useEffect(() => {
        if (categories) {
            setCategoriesList(categories);
        }
    }, [categories]);

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

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        const result = await uploadFileAction(formDataUpload);
        setUploading(false);

        if (result.success && result.data) {
            setFormData({ ...formData, thumbnail: (result.data as any).id });
        } else {
            setError(result.error || 'Gagal mengunggah gambar.');
        }
    };

    const removeThumbnail = () => {
        setFormData({ ...formData, thumbnail: '' });
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

        const result = await saveCategoryAction(formData, initialData?.id);

        if (result.success) {
            router.push('/admin/categories');
            router.refresh();
        } else {
            setError(result.error || 'Terjadi kesalahan saat menyimpan kategori.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12 items-start max-w-[1200px]">
            {/* Left Column: Form Fields */}
            <div className="flex-1 space-y-8 w-full">
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{initialData ? 'Perbarui Kategori' : 'Tambah Kategori Baru'}</h3>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Nama</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-900"
                            placeholder="Contoh: Inverter On-Grid"
                        />
                        <p className="text-xs text-gray-500">Nama kategori ini akan muncul di seluruh situs Anda.</p>
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => {
                                const sanitizedSlug = e.target.value
                                    .toLowerCase()
                                    .replace(/ /g, '-')
                                    .replace(/[^\w-]+/g, '');
                                setFormData({ ...formData, slug: sanitizedSlug });
                            }}
                            required
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-900"
                        />
                        <p className="text-xs text-gray-500">"Slug" adalah versi ramah URL dari nama kategori. Biasanya menggunakan huruf kecil dan hanya berisi huruf, angka, serta tanda hubung.</p>
                    </div>

                    {/* Parent category */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Kategori Induk</label>
                        <select
                            value={formData.parent_category}
                            onChange={(e) => setFormData({ ...formData, parent_category: e.target.value })}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-900"
                        >
                            <option value="">Tidak ada</option>
                            {categoriesList.filter(c => c.id !== initialData?.id).map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500">Pilih kategori induk untuk membuat hierarki. Contoh: Inverter bisa menjadi induk dari On-Grid dan Off-Grid.</p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Deskripsi</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-900 resize-none tabular-nums"
                            placeholder="Berikan sedikit penjelasan tentang kategori ini..."
                        />
                        <p className="text-xs text-gray-500">Deskripsi ini biasanya tidak ditampilkan secara menonjol, namun beberapa tema mungkin menampillkannya.</p>
                    </div>

                    {/* Display type */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Tipe Tampilan</label>
                        <select
                            value={formData.display_type}
                            onChange={(e) => setFormData({ ...formData, display_type: e.target.value as any })}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-gray-900 lg:max-w-xs"
                        >
                            <option value="default">Default</option>
                            <option value="products">Produk</option>
                            <option value="subcategories">Subkategori</option>
                            <option value="both">Keduanya</option>
                        </select>
                    </div>

                    {/* Thumbnail */}
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-gray-700 block">Miniatur (Thumbnail)</label>
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded flex items-center justify-center overflow-hidden relative group">
                                {formData.thumbnail ? (
                                    <>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${formData.thumbnail}`}
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeThumbnail}
                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </>
                                ) : (
                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                        <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="px-4 py-2 bg-white border border-gray-300 text-sm font-semibold rounded text-blue-600 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {uploading ? 'Mengunggah...' : 'Unggah/Tambah Gambar'}
                            </button>
                        </div>
                    </div>


                    {/* Action Button */}
                    <div className="pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded shadow-sm hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 text-sm"
                        >
                            {loading ? 'Memproses...' : (initialData ? 'Perbarui Kategori' : 'Tambah Kategori Baru')}
                        </button>
                    </div>
                </div>

                {/* SEO Configuration - Kept as premium sidebar or below */}
                <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-200 space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Konfigurasi SEO</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Judul SEO</label>
                            <input
                                type="text"
                                value={formData.seo_title}
                                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 outline-none text-gray-900"
                                placeholder="Judul untuk tampilan di mesin pencari..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Kata Kunci SEO</label>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={keywordInput}
                                    onChange={(e) => setKeywordInput(e.target.value)}
                                    onKeyDown={handleAddKeyword}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 outline-none text-gray-900"
                                    placeholder="Tekan Enter untuk menambah..."
                                />
                                <div className="flex flex-wrap gap-2">
                                    {formData.seo_keywords.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold flex items-center gap-2 group hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                                            onClick={() => removeKeyword(tag)}
                                        >
                                            {tag}
                                            <span className="text-gray-400 group-hover:text-red-600">×</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Deskripsi SEO</label>
                            <textarea
                                value={formData.seo_description}
                                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 outline-none text-gray-900 resize-none"
                                placeholder="Deskripsi singkat yang akan muncul di hasil pencarian..."
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Error Message */}
            {error && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 p-6 bg-red-600 text-white rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-500 z-[100]">
                    <span className="font-bold">{error}</span>
                </div>
            )}
        </form>
    );
}

