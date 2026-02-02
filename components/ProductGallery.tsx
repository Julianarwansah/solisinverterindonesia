'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToImage = (index: number) => {
        setActiveIndex(index);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const width = container.offsetWidth;
            container.scrollTo({
                left: width * index,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const index = Math.round(container.scrollLeft / container.offsetWidth);
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    };

    // Auto-hide navigation arrows if only 1 image
    const showNav = images.length > 1;

    return (
        <div className="space-y-6 select-none bg-white p-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
            {/* Main Carousel Area */}
            <div className="relative group rounded-2xl overflow-hidden bg-gray-50 aspect-square">

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {images.length > 0 ? (
                        images.map((img, i) => (
                            <div key={i} className="flex-shrink-0 w-full h-full snap-center relative flex items-center justify-center p-4 sm:p-8">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={img}
                                        alt={`${productName} view ${i + 1}`}
                                        fill
                                        className="object-contain drop-shadow-sm sm:drop-shadow-lg"
                                        priority={i === 0}
                                        draggable={false}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            No Image Available
                        </div>
                    )}
                </div>

                {/* Navigation Arrows (Hidden on Mobile) */}
                {showNav && (
                    <>
                        <button
                            onClick={() => scrollToImage(Math.max(0, activeIndex - 1))}
                            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md rounded-full items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0 hover:scale-110"
                            disabled={activeIndex === 0}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            onClick={() => scrollToImage(Math.min(images.length - 1, activeIndex + 1))}
                            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md rounded-full items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-0 hover:scale-110"
                            disabled={activeIndex === images.length - 1}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </>
                )}

                {/* Pill Indicator */}
                {showNav && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToImage(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail Strip */}
            {showNav && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToImage(i)}
                            className={`group relative w-20 aspect-square flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${i === activeIndex
                                ? 'border-orange-500 shadow-md scale-105'
                                : 'border-transparent hover:border-orange-200 opacity-70 hover:opacity-100 grayscale hover:grayscale-0'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${i + 1}`}
                                fill
                                className="object-cover bg-gray-50"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
