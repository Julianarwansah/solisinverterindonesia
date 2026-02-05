@extends('layouts.app')

@section('title', $article->meta_title ?: $article->title . ' - Solis Inverter Indonesia')
@section('description', $article->meta_description ?: ($article->excerpt ?: 'Baca artikel terbaru seputar teknologi Solis Inverter Indonesia.'))

@section('content')
    <article class="bg-white min-h-screen">
        <header class="pt-20 pb-16 bg-gray-50 border-b border-gray-100">
            <div class="max-w-4xl mx-auto px-6">
                <div class="flex items-center gap-3 mb-6">
                    <a href="/artikel"
                        class="text-xs font-black uppercase tracking-widest text-orange-600 hover:underline">Artikel</a>
                    <span class="text-gray-300">/</span>
                    <span
                        class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ $article->created_at->format('d M Y') }}</span>
                </div>
                <h1 class="text-4xl md:text-6xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8">
                    {{ $article->title }}</h1>

                @if($article->tags && count($article->tags) > 0)
                    <div class="flex flex-wrap gap-2">
                        @foreach($article->tags as $tag)
                            <span
                                class="px-3 py-1 bg-white border border-gray-200 text-[10px] font-bold text-gray-500 rounded-full uppercase">#{{ $tag }}</span>
                        @endforeach
                    </div>
                @endif
            </div>
        </header>

        <div class="max-w-4xl mx-auto px-6 py-16">
            @if($article->featured_image)
                <div class="aspect-[21/9] rounded-[40px] overflow-hidden mb-16 shadow-2xl">
                    <img src="/storage/{{ $article->featured_image }}" alt="{{ $article->title }}"
                        class="object-cover w-full h-full">
                </div>
            @endif

            <div class="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed font-medium">
                {!! $article->content !!}
            </div>

            <div class="mt-20 pt-12 border-t border-gray-100 text-center">
                <h3 class="text-2xl font-black text-gray-900 mb-8">Berbagi Artikel</h3>
                <div class="flex justify-center gap-4">
                    {{-- Social Share Icons --}}
                    <a href="https://wa.me/?text={{ urlencode($article->title . ' ' . Request::url()) }}" target="_blank"
                        class="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </article>

    @if(count($recentArticles) > 0)
        <section class="bg-gray-50 py-24">
            <div class="max-w-7xl mx-auto px-6">
                <h2 class="text-3xl font-black text-gray-900 mb-12 text-center">Artikel Terkait</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    @foreach($recentArticles as $recent)
                        <article
                            class="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                            <a href="/artikel/{{ $recent->slug }}" class="block aspect-video relative overflow-hidden">
                                <img src="/storage/{{ $recent->featured_image ?: 'images/about_main.webp' }}"
                                    alt="{{ $recent->title }}" class="object-cover w-full h-full">
                            </a>
                            <div class="p-6">
                                <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2"><a
                                        href="/artikel/{{ $recent->slug }}">{{ $recent->title }}</a></h3>
                                <p class="text-[10px] font-black uppercase text-orange-500 tracking-widest">
                                    {{ $recent->created_at->format('d M Y') }}</p>
                            </div>
                        </article>
                    @endforeach
                </div>
            </div>
        </section>
    @endif
@endsection