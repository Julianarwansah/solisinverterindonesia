'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/tentang-kami', label: 'Tentang Kami' },
        { href: '/produk', label: 'Produk' },
        { href: '/artikel', label: 'Artikel' },
    ];

    return (
        <>
            {/* Desktop Navbar - Floating Rounded */}
            <div className="hidden md:block sticky top-0 z-50 pt-4 pb-4 bg-orange-50/50">
                <nav className="max-w-7xl mx-auto px-8 py-4 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full shadow-xl flex items-center justify-between">
                    {/* Logo - Left */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <Image
                                src="/images/solisindonesialogo.png"
                                alt="Solis Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-lg font-bold text-gray-900 tracking-tight">Solis Indonesia</span>
                    </Link>

                    {/* Nav Links - Center */}
                    <div className="flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-orange-600 font-semibold transition-all text-base hover:scale-105"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Action Buttons - Right */}
                    <div className="flex items-center gap-6">

                        <a
                            href="https://wa.me/628123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:shadow-2xl transition-all hover:-translate-y-1 text-base flex items-center gap-2 group"
                        >
                            Hubungi Kami
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>


            {/* Mobile Header */}
            <nav className="md:hidden flex items-center justify-between px-6 py-4 bg-orange-50 border-b border-orange-100/50 sticky top-0 z-50">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-9 h-9 flex items-center justify-center">
                        <Image
                            src="/images/solisindonesialogo.png"
                            alt="Solis Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-lg font-bold text-gray-900">Solis Indonesia</span>
                </Link>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 rounded-b-3xl shadow-2xl animate-slide-down">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="relative w-9 h-9 flex items-center justify-center">
                                    <Image
                                        src="/images/solisindonesialogo.png"
                                        alt="Solis Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-lg font-bold text-gray-900">Solis Indonesia</span>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="px-6 py-6 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors text-center"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Contact Button in Mobile */}
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
