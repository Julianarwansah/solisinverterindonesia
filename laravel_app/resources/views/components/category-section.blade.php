@props(['categories'])

<section class="relative py-24 lg:py-32 bg-white overflow-hidden" x-data="{ 
    activeIndex: 0, 
    categories: {{ $categories->toJson() }},
    isVisible: false,
    nextCategory() {
        this.activeIndex = (this.activeIndex + 1) % this.categories.length;
    },
    prevCategory() {
        this.activeIndex = (this.activeIndex - 1 + this.categories.length) % this.categories.length;
    }
}" x-intersect.once="isVisible = true">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 relative">

        <!-- Header Row -->
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 transition-all duration-1000"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
            <div class="max-w-2xl">
                <h2 class="text-4xl md:text-6xl font-[1000] text-gray-900 leading-tight tracking-tight">
                    Kategori <br />
                    <span class="text-orange-500">Produk Unggulan</span>
                </h2>
            </div>
            <a href="/produk"
                class="group flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
                Lihat Semua Produk
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </div>

        <!-- Main Content Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            <!-- Left: Interactive Image -->
            <div class="lg:col-span-7 relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl group transition-all duration-1000 delay-300"
                :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
                <template x-for="(cat, index) in categories" :key="cat.id">
                    <img x-show="activeIndex === index"
                        :src="cat.thumbnail ? (cat.thumbnail.startsWith('http') ? cat.thumbnail : '/' + cat.thumbnail) : '{{ asset('images/about_main.webp') }}'"
                        :alt="cat.name"
                        class="absolute inset-0 object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-105"
                        x-transition:enter="transition ease-out duration-1000" x-transition:enter-start="opacity-0"
                        x-transition:enter-end="opacity-100">
                </template>
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent group-hover:from-black/40 transition-all">
                </div>

                <!-- Interactive Hint -->
                <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                        class="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white font-bold text-sm">
                        Jelajahi Kategori →
                    </div>
                </div>
            </div>

            <!-- Right: Category Details & Navigation -->
            <div class="lg:col-span-5 space-y-10 transition-all duration-1000 delay-500"
                :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'">
                <div class="space-y-6">
                    <a :href="'/produk/kategori/' + categories[activeIndex].slug" class="inline-block group/title">
                        <h3 class="text-3xl md:text-4xl font-black text-orange-500 group-hover/title:text-orange-600 transition-all duration-500"
                            x-text="categories[activeIndex].name">
                        </h3>
                        <div
                            class="h-1 w-0 group-hover/title:w-full bg-orange-500 transition-all duration-500 rounded-full mt-1">
                        </div>
                    </a>
                    <p class="text-gray-500 text-lg leading-relaxed font-medium"
                        x-text="categories[activeIndex].description || 'Temukan solusi energi surya terbaik dengan teknologi inverter canggih untuk efisiensi sistem PLTS Anda.'">
                    </p>
                </div>

                <!-- Navigation Controls -->
                <div class="flex items-center gap-6 pt-6">
                    <button @click="prevCategory"
                        class="w-16 h-16 rounded-full border-2 border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all group active:scale-90">
                        <svg class="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                    </button>
                    <button @click="nextCategory"
                        class="w-16 h-16 rounded-full border-2 border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all group active:scale-90">
                        <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                <!-- Pagination Indicators -->
                <div class="flex gap-3 pt-4">
                    <template x-for="(cat, index) in categories" :key="cat.id">
                        <button @click="activeIndex = index" class="h-1.5 transition-all duration-500 rounded-full"
                            :class="index === activeIndex ? 'w-12 bg-orange-500' : 'w-4 bg-gray-200'"></button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</section>