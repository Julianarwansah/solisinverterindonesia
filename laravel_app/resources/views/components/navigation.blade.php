<div x-data="{ isMobileMenuOpen: false }">
    <!-- Desktop Navbar - Floating Rounded -->
    <div class="hidden md:block sticky top-0 z-50 pt-4 pb-4">
        <nav
            class="max-w-7xl mx-auto px-8 py-4 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full shadow-xl flex items-center justify-between">
            <!-- Logo - Left -->
            <a href="/" class="flex items-center gap-3">
                <img src="/images/solislogo.png" alt="Solis Logo" class="h-10 w-10 object-contain">
                <span class="text-lg font-bold text-gray-900 tracking-tight">Solis Indonesia</span>
            </a>

            <!-- Nav Links - Center -->
            <div class="flex items-center gap-10">
                @php
                    $navLinks = [
                        ['href' => '/', 'label' => 'Beranda'],
                        ['href' => '/tentang-kami', 'label' => 'Tentang Kami'],
                        ['href' => '/produk', 'label' => 'Produk'],
                        ['href' => '/artikel', 'label' => 'Artikel'],
                        ['href' => '/kontak', 'label' => 'Kontak'],
                    ];
                @endphp
                @foreach($navLinks as $link)
                    <a href="{{ $link['href'] }}"
                        class="text-gray-700 hover:text-orange-600 font-semibold transition-all text-base hover:scale-105">
                        {{ $link['label'] }}
                    </a>
                @endforeach
            </div>

            <!-- Action Buttons - Right -->
            <div class="flex items-center gap-6">
                <a href="https://wa.me/6281258885595" target="_blank" rel="noopener noreferrer"
                    class="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:shadow-2xl transition-all hover:-translate-y-1 text-base flex items-center gap-2 group">
                    Hubungi Kami
                </a>
            </div>
        </nav>
    </div>

    <!-- Mobile Header -->
    <nav class="md:hidden flex items-center justify-between px-6 py-4 sticky top-0 z-50 bg-white/80 backdrop-blur-lg">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2">
            <img src="/images/solislogo.png" alt="Solis Logo" class="h-9 w-9 object-contain">
            <span class="text-lg font-bold text-gray-900">Solis Indonesia</span>
        </a>

        <!-- Hamburger Button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Toggle menu">
            <svg x-show="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg x-show="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style="display: none;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </nav>

    <!-- Mobile Sidebar -->
    <div x-show="isMobileMenuOpen" style="display: none;">
        <!-- Backdrop -->
        <div class="md:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" @click="isMobileMenuOpen = false"></div>

        <!-- Sidebar -->
        <div class="md:hidden fixed top-0 left-0 right-0 bg-white z-50 rounded-b-3xl shadow-2xl transition-transform duration-300"
            x-transition:enter="transform transition ease-out duration-300" x-transition:enter-start="-translate-y-full"
            x-transition:enter-end="translate-y-0" x-transition:leave="transform transition ease-in duration-200"
            x-transition:leave-start="translate-y-0" x-transition:leave-end="-translate-y-full">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <a href="/" class="flex items-center gap-2" @click="isMobileMenuOpen = false">
                    <img src="/images/solislogo.png" alt="Solis Logo" class="h-9 w-9 object-contain">
                    <span class="text-lg font-bold text-gray-900">Solis Indonesia</span>
                </a>
                <button @click="isMobileMenuOpen = false"
                    class="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Menu Items -->
            <div class="px-6 py-6 space-y-1">
                @foreach($navLinks as $link)
                    <a href="{{ $link['href'] }}" @click="isMobileMenuOpen = false"
                        class="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors text-center">
                        {{ $link['label'] }}
                    </a>
                @endforeach

                <!-- Contact Button in Mobile -->
                <a href="https://wa.me/6281258885595" target="_blank" rel="noopener noreferrer"
                    class="block mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all">
                    Hubungi Kami
                </a>
            </div>
        </div>
    </div>
</div>