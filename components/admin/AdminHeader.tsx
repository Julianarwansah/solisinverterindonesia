'use client';

import { usePathname } from 'next/navigation';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const pathname = usePathname();

    // Simple breadcrumb or title logic
    const getPageTitle = () => {
        if (pathname === '/admin') return 'Dashboard';
        if (pathname.startsWith('/admin/products')) return 'Produk';
        if (pathname.startsWith('/admin/articles')) return 'Artikel';
        if (pathname.startsWith('/admin/categories')) return 'Kategori';
        return 'Admin';
    };

    return (
        <header className="h-20 md:h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40">
            <div className="flex items-center gap-6">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-3 bg-gray-50 text-gray-900 rounded-2xl hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div>
                    <h2 className="hidden md:block text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-1">Solis Panel</h2>
                    <h1 className="text-xl md:text-2xl font-[1000] text-gray-950 tracking-tighter">{getPageTitle()}</h1>
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                {/* Search Placeholder - Responsive */}
                <div className="hidden sm:flex items-center gap-3 px-6 py-3 bg-gray-50/50 rounded-2xl border border-transparent focus-within:border-orange-200 focus-within:bg-white transition-all">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="Cari..." className="bg-transparent outline-none text-xs font-bold text-gray-950 placeholder:text-gray-300 w-32 md:w-48" />
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 md:gap-4 md:pl-8 md:border-l md:border-gray-100">
                    <div className="hidden md:block text-right text-gray-950">
                        <p className="text-sm font-black tracking-tight leading-none mb-1">Administrator</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Online</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-gray-200 transform-gpu hover:rotate-3 transition-transform">
                        S
                    </div>
                </div>
            </div>
        </header>
    );
}
