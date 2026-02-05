@extends('layouts.app')

@section('title', 'Tentang Kami - Solis Inverter Indonesia')
@section('description', 'Pelajari lebih lanjut tentang Solis Inverter Indonesia - Mitra terpercaya Anda untuk solusi energi tenaga surya.')

@section('content')
    <main class="min-h-screen bg-white relative font-sans">
        {{-- 1. Hero Section --}}
        <section class="relative pt-20 pb-32 overflow-hidden z-10 bg-orange-50/50">
            <div
                class="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse">
            </div>
            <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]"></div>

            <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                <div
                    class="inline-flex items-center gap-3 px-6 py-2 bg-white border border-orange-100 rounded-full text-orange-600 text-xs font-black uppercase tracking-[0.2em] mb-12 shadow-sm">
                    <span class="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
                    Produsen Inverter PV Terbesar Ketiga di Dunia
                </div>

                <h1 class="text-6xl md:text-8xl font-[1000] text-gray-950 tracking-tight leading-[0.95] mb-12">
                    Mengubah Sinar Matahari<br />
                    <span class="text-orange-500">Menjadi Masa Depan</span>
                </h1>

                <p class="text-xl md:text-2xl text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed mb-16">
                    Didirikan pada tahun 2005 sebagai Ginlong (Solis), kami adalah produsen inverter PV terbesar ketiga di
                    dunia, menyediakan solusi penyimpanan energi dan tenaga surya yang komprehensif untuk sektor
                    residensial, komersial, dan utilitas dengan teknologi string yang inovatif.
                </p>

                <div class="flex flex-wrap items-center justify-center gap-6">
                    <a href="https://wa.me/6281258885595"
                        class="px-10 py-5 bg-gray-950 text-white rounded-2xl font-black transition-all hover:-translate-y-1 shadow-2xl">
                        Mari Berkolaborasi
                    </a>
                    <a href="/produk"
                        class="px-10 py-5 bg-white border border-gray-100 text-gray-900 rounded-2xl font-black transition-all hover:-translate-y-1 shadow-sm">
                        Jelajahi Produk
                    </a>
                </div>
            </div>
        </section>

        {{-- 2. Stats Section --}}
        @php
            $stats = [
                ['value' => '50+', 'label' => 'Negara', 'sub' => 'Jangkauan Global'],
                ['value' => '10M+', 'label' => 'Inverter', 'sub' => 'Terpasang Worldwide'],
                ['value' => '98.7%', 'label' => 'Efisiensi', 'sub' => 'Tertinggi di Kelasnya'],
                ['value' => '15+', 'label' => 'Tahun', 'sub' => 'Garansi Premium'],
            ];
        @endphp
        <section class="relative z-20 -mt-16 mb-32">
            <div class="max-w-7xl mx-auto px-6 md:px-12">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    @foreach($stats as $stat)
                        <div
                            class="bg-white rounded-[40px] p-10 border border-gray-100 shadow-2xl hover:border-orange-200 transition-all group">
                            <p class="text-5xl font-[1000] text-gray-950 mb-4 group-hover:text-orange-500 transition-colors">
                                {{ $stat['value'] }}</p>
                            <p class="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">{{ $stat['label'] }}</p>
                            <p class="text-xs text-gray-400 font-medium">{{ $stat['sub'] }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

        {{-- 3. Story Section --}}
        <section class="py-24 overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 md:px-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div class="relative">
                        <div class="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
                            <img src="/images/about_main.webp" alt="Solis Factory" class="object-cover w-full h-full">
                        </div>
                        <div
                            class="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500 rounded-[40px] -z-0 opacity-10 blur-3xl">
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center gap-3 mb-8">
                            <span class="w-12 h-0.5 bg-orange-500"></span>
                            <span class="text-xs font-black text-orange-500 uppercase tracking-[0.3em]">📖 Cerita
                                Kami</span>
                        </div>
                        <h2 class="text-5xl md:text-6xl font-[1000] text-gray-950 mb-8 tracking-tight">
                            Perjalanan Menuju <br />
                            <span
                                class="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 italic">Energi
                                Berkelanjutan</span>
                        </h2>
                        <div class="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                            <p>
                                Didirikan pada tahun 2005 sebagai Ginlong (Solis) dengan kode saham 300763.SZ, kami telah
                                tumbuh menjadi produsen inverter PV terbesar ketiga di dunia, berkomitmen untuk menyediakan
                                penyimpanan energi inovatif dan solusi tenaga surya di sektor residensial, komersial, dan
                                utilitas.
                            </p>
                            <p>
                                Dengan rantai pasokan global kami, kemampuan R&D kelas dunia, dan keahlian adaptasi
                                regional, kami melayani pelanggan di lebih dari 50 negara dengan tim ahli lokal yang
                                berdedikasi dan dukungan finansial yang kuat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- Final CTA Section --}}
        <section class="py-32 mb-20">
            <div class="max-w-7xl mx-auto px-6 md:px-12">
                <div class="relative rounded-[80px] bg-gray-950 p-16 md:p-32 overflow-hidden text-center">
                    <div class="relative z-10 max-w-4xl mx-auto">
                        <h2 class="text-5xl md:text-7xl font-[1000] text-white tracking-tight leading-tight mb-10">
                            Siap Beralih ke <br /><span class="text-orange-500">Energi Bersih?</span>
                        </h2>
                        <a href="https://wa.me/6281258885595"
                            class="px-12 py-6 bg-orange-500 text-white rounded-[32px] font-black uppercase tracking-widest text-sm hover:scale-110 transition-all">
                            Hubungi Kami Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
@endsection