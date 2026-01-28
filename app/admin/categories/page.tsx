import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminCategoriesPage() {
    let categories: any[] = [];

    try {
        categories = await directus.request(readItems('product_categories', {
            fields: ['id', 'name', 'slug', 'description'] as any,
            sort: ['name'] as any,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
    }

    return (
        <div className="space-y-12">
            {/* Action Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">Inventory System</h2>
                    <h1 className="text-3xl md:text-4xl font-[1000] text-gray-950 tracking-tight">Kategori Produk</h1>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="inline-flex items-center justify-center gap-4 px-10 py-5 md:py-6 bg-gray-950 text-white font-black rounded-3xl md:rounded-[32px] hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-600/20 active:scale-95 text-sm md:text-base"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    Kategori Baru
                </Link>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Nama Kategori</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Slug URL</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Deskripsi</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-12 py-24 text-center text-gray-400 font-bold italic">
                                        Belum ada kategori terdaftar.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-[#F8F9FD]/50 transition-colors group">
                                        <td className="px-12 py-8">
                                            <span className="text-lg md:text-xl font-black text-gray-950 tracking-tight">{cat.name}</span>
                                        </td>
                                        <td className="px-12 py-8 text-gray-400 font-bold font-mono text-xs md:text-sm tracking-tighter">
                                            /{cat.slug}
                                        </td>
                                        <td className="px-12 py-8">
                                            <p className="text-xs md:text-sm font-bold text-gray-500 line-clamp-1 max-w-xs">{cat.description || '-'}</p>
                                        </td>
                                        <td className="px-12 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <Link
                                                    href={`/admin/categories/${cat.id}/detail`}
                                                    className="p-4 bg-white border border-gray-200 text-gray-400 hover:text-blue-600 hover:border-blue-200 rounded-2xl transition-all shadow-sm active:scale-95"
                                                    title="Lihat Detail Admin"
                                                >
                                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={`/admin/categories/${cat.id}`}
                                                    className="p-4 bg-white border border-gray-200 text-gray-400 hover:text-orange-600 hover:border-orange-200 rounded-2xl transition-all shadow-sm active:scale-95"
                                                    title="Edit Kategori"
                                                >
                                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </Link>
                                                <DeleteButton id={cat.id} type="product_categories" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
