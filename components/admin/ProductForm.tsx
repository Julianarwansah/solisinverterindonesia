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
        short_description: initialData?.short_description || '',
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

    const generateSlug = () => {
        const slug = formData.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-')     // Replace spaces with -
            .replace(/-+/g, '-')      // Replace multiple - with single -
            .trim();
        setFormData({ ...formData, slug });
    };

    const removeKeyword = (tagToRemove: string) => {
        setFormData({
            ...formData,
            keywords: formData.keywords.filter(tag => tag !== tagToRemove)
        });
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
        <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-8 items-start pb-20 max-w-[1400px] mx-auto">
            {/* Main Content Area */}
            <div className="flex-1 space-y-6 w-full">
                {/* Title Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">Nama Produk</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all font-semibold text-xl text-gray-900 placeholder:text-gray-300 shadow-sm"
                        placeholder="Masukkan nama produk..."
                    />
                </div>

                {/* Description Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                        <h3 className="text-sm font-bold text-gray-700">Product Description</h3>
                        <div className="flex gap-1">
                            <button type="button" className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">Visual</button>
                            <button type="button" className="px-3 py-1 bg-gray-50 border border-transparent rounded text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors">Code</button>
                        </div>
                    </div>
                    <div className="p-1.5 border-b border-gray-100 flex items-center gap-1 bg-white">
                        {['B', 'I', 'U', 'Link', 'Quote', 'List'].map(tool => (
                            <button key={tool} type="button" className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded transition-all font-serif italic font-bold text-sm">{tool[0]}</button>
                        ))}
                    </div>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={12}
                        className="w-full px-5 py-4 bg-white border-none outline-none transition-all font-medium text-gray-800 placeholder:text-gray-200 resize-none text-base leading-relaxed"
                        placeholder="Tuliskan deskripsi lengkap produk di sini..."
                    />
                    <div className="px-5 py-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-[10px] font-medium text-gray-400">Word count: {formData.description.split(/\s+/).filter(Boolean).length}</span>
                    </div>
                </div>


                {/* Slug Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-700">Slug</h3>
                        <button
                            type="button"
                            onClick={generateSlug}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tighter bg-blue-50 px-2 py-1 rounded border border-blue-100 transition-all"
                        >
                            Generate from Name
                        </button>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                            <span>/products/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="bg-transparent border-none outline-none font-bold text-blue-600 flex-1"
                                placeholder="url-slug-produk"
                            />
                        </div>
                    </div>
                </div>

                {/* Short Description Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-700">Product short description</h3>
                    </div>
                    <div className="p-1.5 border-b border-gray-100 flex items-center gap-1 bg-white">
                        {['B', 'I', 'U', 'Link', 'Quote', 'List'].map(tool => (
                            <button key={tool} type="button" className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded transition-all font-serif italic text-sm">{tool[0]}</button>
                        ))}
                    </div>
                    <textarea
                        value={formData.short_description}
                        onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                        rows={6}
                        className="w-full px-5 py-4 bg-white border-none outline-none transition-all font-medium text-gray-800 placeholder:text-gray-200 resize-none text-base leading-relaxed"
                        placeholder="Ringkasan produk untuk tampilan singkat..."
                    />
                </div>

                {/* SEO Configuration Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                        <span className="text-xs font-black bg-gray-200 px-1.5 py-0.5 rounded">SEO</span>
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-tight">Konfigurasi SEO</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600">Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 outline-none transition-all font-medium text-gray-900 shadow-sm"
                                    placeholder="Judul untuk tampilan Google..."
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-[10px] text-gray-400">Target: 60 chars</span>
                                    <span className={`text-[10px] font-bold ${formData.meta_title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>{formData.meta_title.length}/60</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600">Meta Description</label>
                                <textarea
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:border-blue-500 outline-none transition-all font-medium text-gray-900 shadow-sm resize-none text-sm"
                                    placeholder="Deskripsi singkat untuk hasil pencarian..."
                                />
                                <div className="flex justify-between px-1">
                                    <span className="text-[10px] text-gray-400">Target: 160 chars</span>
                                    <span className={`text-[10px] font-bold ${formData.meta_description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>{formData.meta_description.length}/160</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="w-full xl:w-80 space-y-6 sticky top-6">
                {/* Publish Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden shadow-sm">
                    <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xs font-bold text-gray-700">Publish</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <div className={`w-2 h-2 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                    <span>Status:</span>
                                </div>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer hover:underline"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <span>📅</span>
                                    <span>Publish:</span>
                                </div>
                                <span className="font-bold text-gray-900">Immediately</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-2">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="flex-1 py-2 bg-gray-50 text-gray-600 font-medium rounded border border-gray-200 hover:bg-gray-100 transition-all text-xs"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-2 bg-blue-600 text-white font-bold rounded border border-blue-700 hover:bg-blue-700 transition-all text-xs disabled:opacity-50 shadow-sm"
                            >
                                {loading ? '...' : (initialData ? 'Update' : 'Publish')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Categories Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xs font-bold text-gray-700">Product Categories</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-4 border-b border-gray-100 text-[11px] font-bold">
                            <button type="button" className="text-blue-600 border-b-2 border-blue-600 pb-2">All Categories</button>
                            <button type="button" className="text-gray-300 pb-2">Most Used</button>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto px-1 custom-scrollbar">
                            {categories.map((cat) => (
                                <label key={cat.id} className="flex items-center gap-2.5 group cursor-pointer text-xs">
                                    <input
                                        type="checkbox"
                                        checked={formData.category === cat.id}
                                        onChange={() => setFormData({ ...formData, category: cat.id })}
                                        className="w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600 group-hover:text-gray-950 transition-colors uppercase tracking-tight">{cat.name}</span>
                                </label>
                            ))}
                        </div>
                        <button type="button" className="text-[11px] font-medium text-blue-600 hover:underline">+ Add New Category</button>
                    </div>
                </div>

                {/* Product Tags Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xs font-bold text-gray-700">Product Tags</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                onKeyDown={handleAddKeyword}
                                className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-xs focus:border-blue-500 outline-none transition-all shadow-sm"
                                placeholder="..."
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (keywordInput.trim()) {
                                        if (!formData.keywords.includes(keywordInput.trim())) {
                                            setFormData({ ...formData, keywords: [...formData.keywords, keywordInput.trim()] });
                                        }
                                        setKeywordInput('');
                                    }
                                }}
                                className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 font-bold rounded hover:bg-gray-50 transition-all text-xs shadow-sm"
                            >
                                Add
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 italic font-medium">Separate tags with commas</p>
                        <div className="flex flex-wrap gap-1.5">
                            {formData.keywords.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium flex items-center gap-1.5 group hover:bg-gray-200 cursor-pointer border border-gray-200"
                                    onClick={() => removeKeyword(tag)}
                                >
                                    {tag}
                                    <span className="text-gray-300 group-hover:text-red-500">×</span>
                                </span>
                            ))}
                        </div>
                        <button type="button" className="text-[10px] font-medium text-blue-600 hover:underline">Choose from most used tags</button>
                    </div>
                </div>

                {/* Product Image Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xs font-bold text-gray-700">Product Image</h3>
                    </div>
                    <div className="p-4">
                        <div className="aspect-square bg-gray-50 rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 group hover:border-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer">
                            <span className="text-2xl text-gray-200 group-hover:text-blue-500 transition-colors">+</span>
                            <span className="text-[11px] font-bold text-gray-400 group-hover:text-blue-600">Set product image</span>
                        </div>
                    </div>
                </div>

                {/* Product Gallery Meta Box */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-xs font-bold text-gray-700">Product Gallery</h3>
                    </div>
                    <div className="p-4">
                        <button type="button" className="w-full py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded text-[11px] font-bold text-gray-400 hover:bg-blue-50/10 hover:border-blue-500 hover:text-blue-600 transition-all">
                            Add product gallery images
                        </button>
                    </div>
                </div>
            </div>

            {/* Global Error Message Overlay */}
            {error && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 bg-red-600 text-white rounded shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100]">
                    <span className="font-bold text-lg">!</span>
                    <span className="font-bold text-xs uppercase tracking-tight">{error}</span>
                </div>
            )}
        </form>
    );
}
