<footer class="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 pt-16 pb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            <!-- Brand -->
            <div class="space-y-6">
                <a href="/" class="flex items-center gap-3">
                    <div class="relative w-12 h-12">
                        <img src="/images/solislogo.png" alt="Solis Indonesia Logo"
                            class="object-contain w-full h-full">
                    </div>
                    <span class="text-xl font-bold text-white tracking-tight">Solis Indonesia</span>
                </a>
                <p class="text-sm leading-relaxed max-w-xs">
                    Distributor resmi inverter Solis di Indonesia. Menyediakan solusi energi surya terdepan dengan
                    teknologi konversi efisiensi tinggi, aman, dan terpercaya.
                </p>
                <div class="flex gap-4">
                    @foreach([1, 2, 3] as $i)
                        <div
                            class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                    @endforeach
                </div>
            </div>

            <!-- Links -->
            <div>
                <h4 class="text-white font-bold mb-6">Produk</h4>
                <ul class="space-y-4 text-sm">
                    <li><a href="/produk" class="hover:text-orange-500 transition-colors">Semua Produk</a></li>
                    <li><a href="/produk?category=residential" class="hover:text-orange-500 transition-colors">Inverter
                            Residensial</a></li>
                    <li><a href="/produk?category=commercial" class="hover:text-orange-500 transition-colors">Inverter
                            Komersial</a></li>
                    <li><a href="/produk?category=utility" class="hover:text-orange-500 transition-colors">Inverter
                            Utilitas</a></li>
                    <li><a href="/produk?category=hybrid" class="hover:text-orange-500 transition-colors">Inverter
                            Hybrid</a></li>
                </ul>
            </div>

            <!-- Menu Utama -->
            <div>
                <h4 class="text-white font-bold mb-6">Menu Utama</h4>
                <ul class="space-y-4 text-sm">
                    <li><a href="/" class="hover:text-orange-500 transition-colors">Beranda</a></li>
                    <li><a href="/tentang-kami" class="hover:text-orange-500 transition-colors">Tentang Kami</a></li>
                    <li><a href="/produk" class="hover:text-orange-500 transition-colors">Produk</a></li>
                    <li><a href="/artikel" class="hover:text-orange-500 transition-colors">Artikel</a></li>
                    <li><a href="/kontak" class="hover:text-orange-500 transition-colors">Kontak</a></li>
                </ul>
            </div>

            <!-- Contact Info -->
            <div>
                <h4 class="text-white font-bold mb-6">Kontak</h4>
                <ul class="space-y-4 text-sm">
                    <li class="flex gap-3">
                        <svg class="w-5 h-5 text-orange-600 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>+62 812-5888-5595</span>
                    </li>
                    <li class="flex gap-3">
                        <svg class="w-5 h-5 text-orange-600 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>jarwinnofficial@gmail.com</span>
                    </li>
                    <li class="flex gap-3">
                        <svg class="w-5 h-5 text-orange-600 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>BSD Ruko Boulevard, Jalan Raya Taman Tekhno Lt.2, Blok AA No. 7, Ciater, Kec. Serpong,
                            Tangerang Selatan</span>
                    </li>
                </ul>
            </div>
        </div>

        <div
            class="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {{ date('Y') }} Solis Inverter Indonesia. Hak cipta dilindungi.</p>
            <div class="flex gap-6">
                <a href="/syarat-ketentuan" class="hover:text-white transition-colors">Syarat & Ketentuan</a>
                <a href="/privasi" class="hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="/sitemap" class="hover:text-white transition-colors">Peta Situs</a>
            </div>
        </div>
    </div>
</footer>