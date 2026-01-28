'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
    { href: '/admin', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { href: '/admin/categories', label: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
    { href: '/admin/products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { href: '/admin/articles', label: 'Articles', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 z-50">
            {/* Header / Logo Section */}
            <div className="p-10 pb-12">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-14 h-14 bg-orange-50 rounded-[22px] flex items-center justify-center p-3 group-hover:bg-orange-100 transition-all duration-500 group-hover:rotate-6">
                        <Image
                            src="/images/solisindonesialogo.png"
                            alt="Solis Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-[1000] text-gray-950 tracking-tighter leading-none mb-1">Solis</span>
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Management</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 px-6 space-y-2">
                <p className="px-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-6">Menu Utama</p>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-5 px-8 py-5 rounded-[24px] font-[1000] transition-all duration-300 group ${isActive
                                ? 'bg-gray-950 text-white shadow-2xl shadow-gray-950/20 translate-x-1'
                                : 'text-gray-400 hover:text-gray-950 hover:bg-gray-50'
                                }`}
                        >
                            <svg className={`w-6 h-6 ${isActive ? 'text-orange-500' : 'text-gray-300 group-hover:text-gray-950'} transition-all duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2.5 : 2} d={item.icon} />
                            </svg>
                            <span className="tracking-tight">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Footer / User Session */}
            <div className="p-8 border-t border-gray-50">
                <Link
                    href="/"
                    className="flex items-center gap-5 px-8 py-5 rounded-[24px] font-[1000] text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <svg className="w-6 h-6 text-gray-300 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
