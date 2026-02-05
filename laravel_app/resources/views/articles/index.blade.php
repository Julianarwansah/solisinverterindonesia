@extends('layouts.app')

@section('title', 'Artikel & Berita - Solis Inverter Indonesia')

@section('content')
    <main class="bg-gray-50/50 min-h-screen pb-20">
        <section class="relative pt-16 pb-20 bg-white overflow-hidden border-b border-gray-100">
            <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <h1 class="text-4xl md:text-6xl font-[1000] text-gray-900 mb-6 tracking-tight">Wawasan <span
                        class="text-orange-500">Energi</span></h1>
                <p class="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">Temukan berita terbaru, panduan
                    teknis, dan inovasi seputar teknologi inverter Solis di Indonesia.</p>
            </div>
        </section>

        <div class="max-w-7xl mx-auto px-6 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach($articles as $article)
                    <article
                        class="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                        <a href="/artikel/{{ $article->slug }}"
                            class="block aspect-[16/9] relative overflow-hidden bg-gray-100">
                            @if($article->featured_image)
                                <img src="/storage/{{ $article->featured_image }}" alt="{{ $article->title }}"
                                    class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110">
                            @else
                                <div class="absolute inset-0 flex items-center justify-center text-gray-300">
                                    <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            @endif
                        </a>
                        <div class="p-8">
                            <div class="flex items-center gap-3 mb-4">
                                <span
                                    class="text-[10px] font-black uppercase tracking-widest text-orange-500">{{ $article->created_at->format('d M Y') }}</span>
                            </div>
                            <h2
                                class="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors mb-4 line-clamp-2 leading-tight">
                                <a href="/artikel/{{ $article->slug }}">{{ $article->title }}</a>
                            </h2>
                            <p class="text-gray-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                                {{ $article->excerpt ?: strip_tags($article->content) }}
                            </p>
                            <a href="/artikel/{{ $article->slug }}"
                                class="inline-flex items-center gap-2 text-sm font-black text-gray-950 group-hover:text-orange-600 transition-colors">
                                Baca Selengkapnya
                                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </article>
                @endforeach
            </div>

            <div class="mt-16">
                {{ $articles->links() }}
            </div>
        </div>
    </main>
@endsection