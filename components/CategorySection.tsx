'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
}

interface CategorySectionProps {
    categories: Category[];
}

const FALLBACK_CATEGORIES: Category[] = [
    {
        id: 'res',
        name: 'Inverter Residensial',
        slug: 'residensial',
        description: 'Solusi inverter cerdas untuk hunian. Efisiensi tinggi, desain kompak, dan pemantauan real-time untuk hemat daya rumah tangga Anda.',
        image: '/images/hero_1.png'
    },
    {
        id: 'com',
        name: 'Solusi Komersial',
        slug: 'komersial',
        description: 'Konversi energi skala besar untuk bisnis dan industri. Teknologi string inverter tercanggih untuk ROI maksimal dan sistem yang handal.',
        image: '/images/hero_2.png'
    },
    {
        id: 'util',
        name: 'Skala Utilitas Hybrid',
        slug: 'utilitas',
        description: 'Sistem penyimpanan energi terintegrasi untuk stabilitas grid. Masa depan energi bersih dengan manajemen daya cerdas 24/7.',
        image: '/images/hero_3.png'
    }
];

export default function CategorySection({ categories }: CategorySectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Use fallback if no categories from CMS
    const displayCategories = (!categories || categories.length === 0) ? FALLBACK_CATEGORIES : categories;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const nextCategory = () => {
        setActiveIndex((prev) => (prev + 1) % displayCategories.length);
    };

    const prevCategory = () => {
        setActiveIndex((prev) => (prev - 1 + displayCategories.length) % displayCategories.length);
    };

    const activeCategory = displayCategories[activeIndex];

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">

                {/* Header Row */}
                <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-[1000] text-gray-900 leading-tight tracking-tight">
                            Kategori <br />
                            <span className="text-orange-500">Produk Unggulan</span>
                        </h2>
                    </div>
                    <Link href="/produk" className="group flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
                        Lihat Semua Produk
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Main Content Layout - Inspired by Reference */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left: Interactive Image */}
                    <Link
                        href={`/produk/kategori/${activeCategory.slug}`}
                        className={`lg:col-span-7 relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl group transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    >
                        <Image
                            src={activeCategory.image || "/images/about_main.png"}
                            alt={activeCategory.name}
                            fill
                            className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent group-hover:from-black/40 transition-all" />

                        {/* Interactive Hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-white font-bold text-sm">
                                Jelajahi Kategori →
                            </div>
                        </div>
                    </Link>

                    {/* Right: Category Details & Navigation */}
                    <div className={`lg:col-span-5 space-y-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="space-y-6">
                            <Link href={`/produk/kategori/${activeCategory.slug}`} className="inline-block group/title">
                                <h3 className="text-3xl md:text-4xl font-black text-orange-500 group-hover/title:text-orange-600 transition-all duration-500">
                                    {activeCategory.name}
                                </h3>
                                <div className="h-1 w-0 group-hover/title:w-full bg-orange-500 transition-all duration-500 rounded-full mt-1" />
                            </Link>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                {activeCategory.description || "Temukan solusi energi surya terbaik dengan teknologi inverter canggih untuk efisiensi sistem PLTS Anda."}
                            </p>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-6 pt-6">
                            <button
                                onClick={prevCategory}
                                className="w-16 h-16 rounded-full border-2 border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all group active:scale-90"
                            >
                                <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                            </button>
                            <button
                                onClick={nextCategory}
                                className="w-16 h-16 rounded-full border-2 border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all group active:scale-90"
                            >
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Pagination Indicators */}
                        <div className="flex gap-3 pt-4">
                            {displayCategories.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-1.5 transition-all duration-500 rounded-full ${index === activeIndex ? 'w-12 bg-orange-500' : 'w-4 bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
