@php
    $features = [
        [
            'title' => 'Proteksi AFCI 2.0',
            'subtitle' => 'Keamanan Utama',
            'description' => 'Algoritma cerdas yang mampu mendeteksi percikan api DC dalam 0.5 detik, menghentikan risiko kebakaran sebelum terjadi.',
            'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
            'colSpan' => 'lg:col-span-2',
            'rowSpan' => 'lg:row-span-1',
            'bgClasses' => 'bg-gradient-to-br from-orange-50 to-orange-100/50',
            'border' => 'border-orange-100',
            'iconBg' => 'bg-orange-600 text-white',
            'hasBgImage' => true,
        ],
        [
            'title' => 'Efisiensi 99.9%',
            'subtitle' => 'Performa Maksimal',
            'description' => 'Teknologi inverter dengan efisiensi konversi tertinggi di kelasnya untuk ROI maksimal.',
            'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
            'colSpan' => 'lg:col-span-1',
            'rowSpan' => 'lg:row-span-1',
            'bgClasses' => 'bg-white',
            'border' => 'border-slate-100',
            'iconBg' => 'bg-blue-50 text-blue-600',
            'hasBgImage' => false,
        ],
        [
            'title' => 'Solis Cloud',
            'subtitle' => 'Kontrol Cerdas',
            'description' => 'Kendali penuh sistem PLTS Anda melalui aplikasi mobile cerdas 24/7.',
            'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>',
            'colSpan' => 'lg:col-span-1',
            'rowSpan' => 'lg:row-span-1',
            'bgClasses' => 'bg-white',
            'border' => 'border-slate-100',
            'iconBg' => 'bg-emerald-50 text-emerald-600',
            'hasBgImage' => false,
        ],
        [
            'title' => 'Proteksi IP66',
            'subtitle' => 'Daya Tahan Ekstrem',
            'description' => 'Didesain untuk bertahan di cuaca tropis ekstrem Indonesia.',
            'icon' => '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4V11" /></svg>',
            'colSpan' => 'lg:col-span-2',
            'rowSpan' => 'lg:row-span-1',
            'bgClasses' => 'bg-slate-50',
            'border' => 'border-slate-100',
            'iconBg' => 'bg-purple-50 text-purple-600',
            'hasBgImage' => false,
        ]
    ];
@endphp

<section class="py-24 bg-white overflow-hidden" x-data="{ isVisible: false }" x-intersect.once="isVisible = true">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        <!-- Header -->
        <div class="mb-20 max-w-3xl transition-all duration-1000"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
            <div class="flex items-center gap-4 mb-6">
                <span class="flex h-[2px] w-12 bg-orange-600 rounded-full"></span>
                <span class="text-orange-600 font-bold tracking-widest uppercase text-sm">Teknologi & Inovasi</span>
            </div>
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Fitur Unggulan <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                    Kelas Dunia.
                </span>
            </h2>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px] lg:auto-rows-[220px]">
            @foreach($features as $index => $feature)
                <div class="group relative rounded-3xl p-8 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 border {{ $feature['colSpan'] }} {{ $feature['rowSpan'] }} {{ $feature['bgClasses'] }} {{ $feature['border'] }} transition-all duration-1000"
                    style="transition-delay: {{ $index * 150 }}ms"
                    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'">

                    @if($feature['hasBgImage'])
                        <div
                            class="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 mix-blend-multiply">
                            <img src="/images/tech_feature_bg.png" alt="background pattern" class="object-cover w-full h-full">
                        </div>
                    @endif

                    <div class="relative z-10 h-full flex flex-col justify-between">
                        <div class="flex items-start justify-between mb-4">
                            <div
                                class="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm {{ $feature['iconBg'] }}">
                                {!! $feature['icon'] !!}
                            </div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {{ $feature['subtitle'] }}
                            </p>
                        </div>

                        <div>
                            <h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                                {{ $feature['title'] }}
                            </h3>
                            <p class="text-sm text-slate-600 leading-relaxed font-medium">
                                {{ $feature['description'] }}
                            </p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>