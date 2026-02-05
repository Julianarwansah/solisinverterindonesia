@extends('layouts.app')

@section('title', $product->meta_title ?: $product->name . ' - Solis Inverter')
@section('description', $product->meta_description ?: 'Detail produk ' . $product->name . ' dari Solis Inverter Indonesia.')

@section('content')
    <div class="min-h-screen bg-gray-50/50 pb-20 overflow-x-hidden w-full">
        <!-- Breadcrumb Header -->
        <div class="bg-white border-b border-gray-100 w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div class="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
                    <a href="/" class="hover:text-orange-600 transition-colors">Beranda</a>
                    <svg class="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <a href="/produk" class="hover:text-orange-600 transition-colors">Produk</a>
                    <svg class="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span class="text-gray-900 font-medium truncate">{{ $product->name }}</span>
                </div>
            </div>
        </div>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-20">

                <!-- Left Column: Gallery -->
                <div x-data="{ activeImage: '{{ $product->images[0] ?? '' }}' }">
                    <div
                        class="aspect-square relative rounded-[40px] bg-white border border-gray-100 shadow-xl overflow-hidden mb-6">
                        @if($product->images && count($product->images) > 0)
                            <img :src="activeImage.startsWith('http') ? activeImage : '/' + activeImage"
                                alt="{{ $product->name }}"
                                class="object-contain p-10 w-full h-full transition-all duration-500">
                        @else
                            <div class="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-200">
                                <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        @endif
                    </div>

                    @if($product->images && count($product->images) > 1)
                        <div class="grid grid-cols-4 gap-4">
                            @foreach($product->images as $img)
                                <button @click="activeImage = '{{ $img }}'"
                                    class="aspect-square rounded-2xl border-2 transition-all p-2 bg-white"
                                    :class="activeImage === '{{ $img }}' ? 'border-orange-500 shadow-lg' : 'border-transparent hover:border-orange-200'">
                                    <img src="{{ asset('') }}${img}" class="object-contain w-full h-full">
                                </button>
                            @endforeach
                        </div>
                    @endif
                </div>

                <!-- Right Column: Details -->
                <div class="space-y-8">
                    <div>
                        @if($product->category)
                            <a href="/produk/kategori/{{ $product->category->slug }}"
                                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 mb-4 hover:bg-orange-100 transition-colors">
                                {{ $product->category->name }}
                            </a>
                        @endif
                        <h1
                            class="text-3xl sm:text-4xl lg:text-5xl font-[900] text-gray-900 tracking-tight leading-[1.1] mb-6">
                            {{ $product->name }}
                        </h1>
                        <div class="flex items-center gap-4 text-sm text-gray-500">
                            <span class="flex items-center gap-1.5 text-blue-600 font-medium">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Official Warranty
                            </span>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="prose prose-orange max-w-none text-gray-600 leading-relaxed">
                        {!! $product->description !!}
                    </div>

                    <!-- Actions -->
                    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 mb-2">Tertarik dengan produk ini?</h3>
                            <p class="text-gray-500 text-sm">Tim ahli kami siap membantu Anda memilih solusi inverver
                                terbaik.</p>
                        </div>

                        <a href="https://wa.me/6281258885595?text=Halo%20Solis%20Indonesia,%20saya%20tertarik%20dengan%20produk%20{{ urlencode($product->name) }}"
                            class="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg rounded-xl shadow-lg transition-all"
                            target="_blank">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Konsultasi via WhatsApp
                        </a>
                    </div>

                    <!-- Tags -->
                    @if($product->tags && count($product->tags) > 0)
                        <div class="pt-6 border-t border-gray-100">
                            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</h4>
                            <div class="flex flex-wrap gap-2">
                                @foreach($product->tags as $tag)
                                    <span
                                        class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200">
                                        #{{ $tag }}
                                    </span>
                                @endforeach
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </main>
    </div>
@endsection