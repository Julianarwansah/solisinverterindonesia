import directus from '@/lib/directus';
import { readItem } from '@directus/sdk';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getCategory(id: string) {
    try {
        const category = await directus.request(readItem('product_categories', id, {
            fields: ['*', { thumbnail: ['*'], parent_category: ['id', 'name'] }] as any,
        }));
        return category;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

export default async function CategoryDetailPage({ params }: any) {
    const { id } = await params;
    const category: any = await getCategory(id);

    if (!category) {
        notFound();
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <Link href="/admin/categories" className="text-gray-400 hover:text-orange-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Detail Kategori</h2>
                    </div>
                    <h1 className="text-4xl font-[1000] text-gray-950 tracking-tight">{category.name}</h1>
                </div>
                <Link
                    href={`/admin/categories/${category.id}`}
                    className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-gray-950 text-white font-black rounded-[32px] hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-600/20 active:scale-95 text-sm md:text-base"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Kategori
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Informasi Dasar</h3>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Slug URL</label>
                                    <p className="text-lg font-bold text-gray-950 bg-gray-50 px-4 py-2 rounded-xl inline-block">/{category.slug}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Tipe Tampilan</label>
                                    <p className="text-lg font-bold text-gray-950 capitalize">{category.display_type || 'default'}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Kategori Induk</label>
                                    <p className="text-lg font-bold text-gray-950">{category.parent_category?.name || 'Tidak ada'}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Status</label>
                                    <span className="px-4 py-1 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest border border-green-100 italic">Active</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Deskripsi</label>
                                <p className="text-gray-600 leading-relaxed font-medium">{category.description || 'Tidak ada deskripsi.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* SEO Info */}
                    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Pengaturan SEO</h3>
                        </div>
                        <div className="p-10 space-y-8">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Meta Title</label>
                                <p className="text-lg font-bold text-gray-950">{category.seo_title || '-'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Meta Description</label>
                                <p className="text-gray-600 font-medium">{category.seo_description || '-'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Keywords</label>
                                <div className="flex flex-wrap gap-2">
                                    {category.seo_keywords && category.seo_keywords.length > 0 ? (
                                        category.seo_keywords.map((word: string, i: number) => (
                                            <span key={i} className="px-4 py-2 bg-orange-50 text-orange-600 text-xs font-bold rounded-xl border border-orange-100">
                                                {word}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 italic">Tidak ada kata kunci.</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Thumbnail */}
                    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Miniatur (Thumbnail)</h3>
                        </div>
                        <div className="p-10">
                            <div className="aspect-square bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden flex items-center justify-center">
                                {category.thumbnail ? (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${typeof category.thumbnail === 'object' ? category.thumbnail.id : category.thumbnail}`}
                                        alt={category.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-10 py-6 border-b border-gray-50 bg-gray-50/50">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Meta Data</h3>
                        </div>
                        <div className="p-10 space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">ID Unik</label>
                                <code className="text-[10px] font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">{category.id}</code>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Dibuat Pada</label>
                                <p className="text-xs font-bold text-gray-900">{new Date(category.date_created).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            {category.date_updated && (
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Terakhir Diperbarui</label>
                                    <p className="text-xs font-bold text-gray-900">{new Date(category.date_updated).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
