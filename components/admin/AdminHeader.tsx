'use client';

import { usePathname } from 'next/navigation';

export default function AdminHeader() {
    const pathname = usePathname();

    // Simple breadcrumb or title logic
    const getPageTitle = () => {
        if (pathname === '/admin') return 'Dashboard Overview';
        if (pathname.startsWith('/admin/products')) return 'Product Management';
        if (pathname.startsWith('/admin/articles')) return 'Article Management';
        if (pathname.startsWith('/admin/categories')) return 'Category Management';
        return 'Admin Panel';
    };

    return (
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-40">
            <div>
                <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.3em] mb-1">Administrator</h2>
                <h1 className="text-2xl font-black text-gray-950 tracking-tight">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-8">
                {/* Search Placeholder */}
                <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm font-bold text-gray-950 placeholder:text-gray-300 w-48" />
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4 pl-8 border-l border-gray-100">
                    <div className="text-right">
                        <p className="text-sm font-black text-gray-950">Admin Solis</p>
                        <p className="text-[10px] font-bold text-gray-400">Super Admin</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
