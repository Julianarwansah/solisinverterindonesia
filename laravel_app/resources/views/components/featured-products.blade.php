@props(['products'])

<section class="py-24 bg-white">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12">

        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
            <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span class="w-2 h-2 rounded-full bg-orange-600"></span>
                Produk Terpopuler
            </div>
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Produk Pilihan <span class="text-orange-600">Terbaik</span>
            </h2>
            <p class="text-slate-600 text-lg">
                Solusi inverter energi surya efisiensi tinggi untuk kebutuhan rumah tangga hingga industri.
            </p>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            @foreach($products as $product)
                <a href="/produk/{{ $product->slug }}"
                    class="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                    <!-- Image Container -->
                    <div
                        class="aspect-[4/3] relative mb-6 rounded-2xl overflow-hidden bg-slate-50 group-hover:bg-orange-50/50 transition-colors">
                        @if($product->images && count($product->images) > 0)
                            <img src="{{ asset($product->images[0]) }}" alt="{{ $product->name }}"
                                class="object-contain p-6 transition-transform duration-700 group-hover:scale-110 h-full w-full">
                        @else
                            <div
                                class="absolute inset-0 flex items-center justify-center flex-col gap-2 text-slate-300 font-medium bg-slate-100">
                                <svg class="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span class="text-xs uppercase tracking-wider">Tanpa Gambar</span>
                            </div>
                        @endif

                        @if($product->tags && count($product->tags) > 0)
                            <span
                                class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm border border-slate-100">
                                {{ $product->tags[0] }}
                            </span>
                        @endif
                    </div>

                    <!-- Content -->
                    <div class="space-y-4 flex-1 flex flex-col">
                        <div>
                            <h3
                                class="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                {{ $product->name }}
                            </h3>
                            <div class="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed">
                                {!! strip_tags($product->short_description ?: $product->description) !!}
                            </div>
                        </div>

                        <div class="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                            <span class="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                Lihat Detail
                            </span>
                            <div
                                class="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            @endforeach
        </div>

        <!-- View All Button -->
        <div class="text-center">
            <a href="/produk"
                class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25 active:scale-95">
                <span>Lihat Semua Produk</span>
                <svg class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </div>

    </div>
</section>