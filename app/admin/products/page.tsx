import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminProductsPage() {
    let products: any[] = [];

    try {
        products = await directus.request(readItems('products', {
            fields: ['id', 'name', 'status', 'category.name', 'images'] as any,
            sort: ['-date_created'] as any,
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <div className="space-y-12">
            {/* Action Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">Inventory Hub</h2>
                    <h1 className="text-3xl md:text-4xl font-[1000] text-gray-950 tracking-tight">Katalog Produk</h1>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-4 px-10 py-5 md:py-6 bg-gray-950 text-white font-black rounded-3xl md:rounded-[32px] hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-600/20 active:scale-95 text-sm md:text-base"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Produk
                </Link>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-[40px] md:rounded-[50px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Status</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Produk</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Kategori</th>
                                <th className="px-12 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-12 py-24 text-center text-gray-400 font-bold italic">
                                        Belum ada produk terdaftar.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-[#F8F9FD]/50 transition-colors group">
                                        <td className="px-12 py-8">
                                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${product.status === 'published'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-12 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                                                    {product.images?.[0] ? (
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${typeof product.images[0] === 'object' ? product.images[0].directus_files_id : product.images[0]}`}
                                                            alt={product.name}
                                                            width={64}
                                                            height={64}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-gray-950 tracking-tight leading-none mb-1">{product.name}</p>
                                                    <p className="text-xs font-bold text-gray-400 group-hover:text-orange-500 transition-colors uppercase tracking-widest">/{product.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-8">
                                            <span className="text-sm font-black text-gray-500 bg-gray-50 px-4 py-2 rounded-xl group-hover:bg-white transition-colors border border-gray-100/50">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-12 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="p-4 bg-white border border-gray-200 text-gray-400 hover:text-orange-600 hover:border-orange-200 rounded-2xl transition-all shadow-sm active:scale-95"
                                                    title="Edit Produk"
                                                >
                                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </Link>
                                                <DeleteButton id={product.id} type="product" />
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
