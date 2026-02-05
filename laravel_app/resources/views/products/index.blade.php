@extends('layouts.app')

@section('title', isset($category) ? 'Katalog ' . $category->name . ' - Solis Inverter' : 'Katalog Produk Solis Inverter')

@section('content')
    <main class="bg-white min-h-screen overflow-x-hidden">
        <!-- Page Hero Section -->
        <section class="relative pt-12 pb-16 bg-orange-50/50 overflow-hidden">
            <!-- Background Decor -->
            <div
                class="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse">
            </div>
            <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]"></div>

            <div class="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                <div class="text-center max-w-3xl mx-auto">
                    <div
                        class="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
                        <a href="/" class="hover:text-orange-600 transition-colors">Beranda</a>
                        <span class="text-gray-300">/</span>
                        <span class="text-orange-600">Produk</span>
                    </div>

                    <h1
                        class="text-4xl sm:text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8">
                        @if(isset($category))
                            {{ $category->name }}
                        @else
                            Katalog <span
                                class="text-orange-500 underline decoration-orange-200 underline-offset-8">Produk</span>
                        @endif
                    </h1>

                    <p class="text-base md:text-xl text-gray-500 font-medium leading-relaxed">
                        @if(isset($category))
                            {{ $category->description ?: 'Temukan solusi inverter terbaik untuk skala ' . strtolower($category->name) . '.' }}
                        @else
                            Temukan solusi inverter terbaik untuk kebutuhan energi Anda. Kami menyediakan berbagai pilihan untuk
                            sistem residensial, komersial, hingga skala industri.
                        @endif
                    </p>
                </div>
            </div>
        </section>

        <!-- Catalog Header Section -->
        <div class="bg-white border-b border-gray-100 shadow-sm">
            <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div class="flex items-center gap-4">
                        <div class="w-1.5 h-10 bg-orange-500 rounded-full"></div>
                        <div>
                            <p class="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Katalog Produk
                            </p>
                            <p class="text-gray-900 text-lg md:text-xl font-[1000] tracking-tight">Menampilkan
                                {{ $products->count() }} pilihan terbaik
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Area -->
        <div class="bg-white w-full">
            <div class="max-w-[1440px] mx-auto px-6 md:px-12 pt-6 pb-12">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <!-- Sidebar Desktop -->
                    <aside class="hidden lg:block lg:col-span-3 space-y-12 h-fit">
                        <div class="bg-gray-50/50 rounded-[40px] p-8 border border-gray-100/50">
                            <h3
                                class="text-xs font-[1000] text-gray-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                <span class="w-8 h-[2px] bg-orange-500/30"></span>
                                Kategori
                            </h3>
                            <div class="space-y-4">
                                <a href="/produk"
                                    class="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 {{ !isset($category) ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600' }}">
                                    <span class="font-bold">Semua Produk</span>
                                </a>
                                @foreach($categories as $cat)
                                    <a href="/produk/kategori/{{ $cat->slug }}"
                                        class="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 {{ isset($category) && $category->id == $cat->id ? 'bg-orange-500 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-600' }}">
                                        <span class="font-bold">{{ $cat->name }}</span>
                                    </a>
                                @endforeach
                            </div>
                        </div>

                        <!-- Help Card -->
                        <div
                            class="relative rounded-[40px] p-10 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden shadow-2xl">
                            <div class="relative z-10 flex flex-col items-center text-center">
                                <h4 class="text-2xl font-black mb-4 tracking-tight">Butuh Bantuan Ahli?</h4>
                                <p class="text-slate-400 mb-8 leading-relaxed font-medium">Tim kami siap membantu Anda
                                    memilih solusi energi terbaik.</p>
                                <a href="https://wa.me/6281258885595"
                                    class="w-full py-4 bg-orange-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-center">
                                    WhatsApp Kami
                                </a>
                            </div>
                        </div>
                    </aside>

                    <!-- Product Grid -->
                    <div class="lg:col-span-9">
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                            @foreach($products as $product)
                                <div
                                    class="group bg-white rounded-[40px] border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-700 flex flex-col overflow-hidden">
                                    <a href="/produk/{{ $product->slug }}"
                                        class="aspect-square relative overflow-hidden bg-gray-50/50">
                                        @if($product->images && count($product->images) > 0)
                                            <img src="{{ asset($product->images[0]) }}" alt="{{ $product->name }}"
                                                class="object-contain p-10 transition-transform duration-1000 group-hover:scale-110 h-full w-full">
                                        @else
                                            <div
                                                class="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-200">
                                                <svg class="w-16 h-16 opacity-30" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        @endif
                                    </a>
                                    <div class="p-10 flex flex-col flex-1">
                                        <h3
                                            class="text-xl sm:text-2xl font-[1000] text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 block mb-3">
                                            {{ $product->name }}
                                        </h3>
                                        <div class="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium mb-6">
                                            {!! strip_tags($product->short_description ?: $product->description) !!}
                                        </div>
                                        <div
                                            class="mt-auto flex items-center justify-between gap-4 pt-8 border-t border-gray-50">
                                            <div>
                                                <span
                                                    class="text-[10px] font-[1000] text-gray-400 uppercase tracking-[0.2em] block">Status
                                                    Harga</span>
                                                <span class="text-xl font-[1000] text-gray-950">Hubungi Kami</span>
                                            </div>
                                            <a href="/produk/{{ $product->slug }}"
                                                class="w-14 h-14 rounded-[22px] bg-orange-50 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        <!-- Pagination -->
                        <div class="mt-16">
                            {{ $products->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection