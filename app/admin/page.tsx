import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';

export default async function AdminDashboard() {
    // Fetch some basic stats
    let productCount = 0;
    let articleCount = 0;
    let categoryCount = 0;

    try {
        const [products, articles, categories] = await Promise.all([
            directus.request(readItems('products', { fields: ['id'] as any })),
            directus.request(readItems('articles', { fields: ['id'] as any })),
            directus.request(readItems('product_categories', { fields: ['id'] as any }))
        ]);
        productCount = products.length;
        articleCount = articles.length;
        categoryCount = categories.length;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-950 rounded-[40px] md:rounded-[60px] p-10 md:p-16 text-white shadow-2xl shadow-gray-950/20">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500 rounded-full blur-[80px] md:blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-orange-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6">Solis Management System</h2>
                    <h1 className="text-4xl md:text-6xl font-[1000] tracking-tighter leading-tight mb-6 md:mb-8">
                        Selamat Datang Kembali, <span className="text-orange-500">Admin.</span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-xl font-medium leading-relaxed">
                        Sistem manajemen Solis Indonesia siap digunakan. Pantau performa katalog produk dan artikel Anda secara real-time.
                    </p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                <StatCard
                    label="Katalog Produk"
                    value={productCount}
                    icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    color="orange"
                    trend="+2 bulan ini"
                />
                <StatCard
                    label="Kategori Aktif"
                    value={categoryCount}
                    icon="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    color="blue"
                    trend="Optimal"
                />
                <StatCard
                    label="Artikel Terbit"
                    value={articleCount}
                    icon="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"
                    color="purple"
                    trend="+500 view"
                />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-12 border border-blue-50/50 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                    <h3 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight">Aktivitas Terakhir</h3>
                    <button className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] hover:text-orange-600 transition-colors bg-orange-50 px-6 py-3 rounded-xl self-start sm:self-auto">Lihat Semua</button>
                </div>
                <div className="space-y-4 md:space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 p-6 rounded-[30px] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-orange-500 transition-all shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-950 font-black tracking-tight text-base">Pembaruan Inventori</p>
                                <p className="text-gray-400 text-xs md:text-sm font-bold leading-relaxed">Admin mengubah status produk "Solis 5G" menjadi <span className="text-orange-500">Published</span></p>
                            </div>
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full self-start sm:self-auto">{i * 10}m lalu</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color, trend }: { label: string, value: number, icon: string, color: string, trend: string }) {
    const colorClasses: Record<string, string> = {
        orange: 'bg-orange-50 text-orange-600',
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/10 hover:-translate-y-2 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700`} />

            <div className={`w-16 h-16 md:w-20 md:h-20 ${colorClasses[color]} rounded-[24px] md:rounded-[28px] flex items-center justify-center p-4 md:p-5 mb-8 md:mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative z-10 shadow-sm`}>
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{label}</p>
                    <span className="text-[9px] md:text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">{trend}</span>
                </div>
                <p className="text-5xl md:text-6xl font-[1000] text-gray-950 tracking-tighter">{value}</p>
            </div>
        </div>
    );
}
