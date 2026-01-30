import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/images/solisindonesialogo.png"
                                    alt="Solis Indonesia Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Solis Indonesia</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Distributor resmi inverter Solis di Indonesia. Menyediakan solusi energi surya terdepan dengan teknologi konversi efisiensi tinggi, aman, dan terpercaya.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Produk</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/produk" className="hover:text-orange-500 transition-colors">Semua Produk</Link></li>
                            <li><Link href="/produk?category=residential" className="hover:text-orange-500 transition-colors">Inverter Residensial</Link></li>
                            <li><Link href="/produk?category=commercial" className="hover:text-orange-500 transition-colors">Inverter Komersial</Link></li>
                            <li><Link href="/produk?category=utility" className="hover:text-orange-500 transition-colors">Inverter Utilitas</Link></li>
                            <li><Link href="/produk?category=hybrid" className="hover:text-orange-500 transition-colors">Inverter Hybrid</Link></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Menu Utama</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/" className="hover:text-orange-500 transition-colors">Beranda</Link></li>
                            <li><Link href="/tentang-kami" className="hover:text-orange-500 transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/produk" className="hover:text-orange-500 transition-colors">Produk</Link></li>
                            <li><Link href="/artikel" className="hover:text-orange-500 transition-colors">Artikel</Link></li>
                            <li><Link href="/kontak" className="hover:text-orange-500 transition-colors">Kontak</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Kontak</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-orange-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+62 812-5888-5595</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-orange-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>jarwinnofficial@gmail.com</span>
                            </li>
                            <li className="flex gap-3">
                                <svg className="w-5 h-5 text-orange-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>BSD Ruko Boulevard, Jalan Raya Taman Tekhno Lt.2, Blok AA No. 7, Ciater, Kec. Serpong, Tangerang Selatan</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} Solis Inverter Indonesia. Hak cipta dilindungi.</p>
                    <div className="flex gap-6">
                        <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
                        <Link href="/privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Peta Situs</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
