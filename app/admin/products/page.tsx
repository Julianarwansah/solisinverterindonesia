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
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-4xl font-[1000] text-gray-950 mb-2 tracking-tight">Manajemen Produk</h1>
                    <p className="text-gray-500 font-medium">Tambah, edit, atau hapus produk dari katalog Anda.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-orange-600 text-white font-black rounded-3xl hover:bg-orange-700 transition-all hover:shadow-xl hover:shadow-orange-600/20 active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Produk
                </Link>
            </div>

            {/* Product Grid/Table */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Produk</th>
                                <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kategori</th>
                                <th className="px-10 py-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-10 py-20 text-center text-gray-400 font-bold">
                                        Belum ada produk yang tersedia.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="relative w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-2">
                                                    {product.images && product.images[0] ? (
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${product.images[0].directus_files_id}`}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain p-1"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-lg font-bold text-gray-950">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${product.status === 'published'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-gray-500 font-bold">
                                            {product.category?.name || '-'}
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-orange-600 hover:border-orange-100 rounded-xl transition-all shadow-sm active:scale-90"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
