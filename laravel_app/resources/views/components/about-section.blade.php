<section class="relative py-24 lg:py-0 lg:min-h-screen flex items-center bg-white overflow-hidden"
    x-data="{ isVisible: false }" x-intersect.once="isVisible = true">
    <!-- Background Decorative Elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div class="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-6 md:px-12 relative w-full pt-12 md:pt-0">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <!-- Left Content Column -->
            <div class="space-y-10 transition-all duration-[1200ms] transform"
                :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'">
                <div class="space-y-6">
                    <div
                        class="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-orange-100 rounded-full shadow-sm">
                        <span class="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                        <span class="text-orange-600 text-[10px] md:text-sm font-black tracking-widest uppercase">
                            Pionir Teknologi Inverter Global
                        </span>
                    </div>

                    <h2 class="text-4xl md:text-7xl font-[1000] text-gray-900 leading-[1.05] tracking-tight">
                        Inverter Cerdas untuk <br />
                        <span class="text-orange-500">Sistem Panel Surya Anda</span>
                    </h2>

                    <p class="text-gray-500 text-base md:text-xl leading-relaxed max-w-xl font-medium">
                        Optimalkan performa <strong>panel surya</strong> Anda dengan teknologi string inverter dari
                        Solis. Kami menghadirkan solusi konversi energi terpercaya untuk sistem PLTS perumahan hingga
                        skala industri di Indonesia.
                    </p>
                </div>
            </div>

            <!-- Right Visual Column -->
            <div class="flex flex-col gap-10 transition-all duration-[1500ms] delay-500 transform"
                :class="isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'">
                <div
                    class="relative aspect-[16/10] lg:aspect-[16/11] rounded-[48px] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] bg-gray-100 group">
                    <img src="/images/about_main.webp" alt="Instalasi Inverter Solis"
                        class="object-cover w-full h-full transition-transform duration-[3000ms] group-hover:scale-105">
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70">
                    </div>

                    <!-- Floating Tech Badge -->
                    <div
                        class="absolute top-8 right-8 bg-white/90 backdrop-blur-xl p-5 md:p-7 rounded-[32px] shadow-2xl border border-white/50 animate-float invisible sm:visible">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-2xl font-black text-gray-900 leading-none">AFCI 2.0</div>
                                <div class="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">
                                    Keamanan Proteksi Petir</div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Label Content -->
                    <div class="absolute bottom-8 left-8 right-8">
                        <div class="bg-white/10 backdrop-blur-xl px-8 py-5 rounded-[32px] border border-white/20">
                            <p
                                class="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-1.5">
                                Solis Cloud Platform</p>
                            <p class="text-white text-lg md:text-2xl font-black tracking-tight leading-tight">Monitoring
                                Energi Real-time 2025</p>
                        </div>
                    </div>
                </div>

                <!-- Feature Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
                    <div
                        class="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                        <div
                            class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 group-hover:rotate-12 transition-transform shadow-inner">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-black text-gray-900 text-base">Efisiensi Tinggi</h4>
                            <p class="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Konversi Daya
                                Maksimum</p>
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                        <div
                            class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 group-hover:-rotate-12 transition-transform shadow-inner">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-black text-gray-900 text-base">Layanan Lokal</h4>
                            <p class="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Dukungan Resmi
                                Indonesia</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>