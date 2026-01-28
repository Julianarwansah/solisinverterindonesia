'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const features = [
    {
        title: 'Proteksi AFCI 2.0',
        subtitle: 'Keamanan Utama',
        description: 'Algoritma cerdas yang mampu mendeteksi percikan api DC dalam 0.5 detik, menghentikan risiko kebakaran sebelum terjadi.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        colSpan: 'lg:col-span-2',
        rowSpan: 'lg:row-span-1',
        bgClasses: 'bg-gradient-to-br from-orange-50 to-orange-100/50',
        border: 'border-orange-100',
        iconBg: 'bg-orange-600 text-white',
        hasBgImage: true,
    },
    {
        title: 'Efisiensi 99.9%',
        subtitle: 'Performa Maksimal',
        description: 'Teknologi inverter dengan efisiensi konversi tertinggi di kelasnya untuk ROI maksimal.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        colSpan: 'lg:col-span-1',
        rowSpan: 'lg:row-span-1',
        bgClasses: 'bg-white',
        border: 'border-slate-100',
        iconBg: 'bg-blue-50 text-blue-600',
        hasBgImage: false,
    },
    {
        title: 'Solis Cloud',
        subtitle: 'Kontrol Cerdas',
        description: 'Kendali penuh sistem PLTS Anda melalui aplikasi mobile cerdas 24/7.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        colSpan: 'lg:col-span-1',
        rowSpan: 'lg:row-span-1',
        bgClasses: 'bg-white',
        border: 'border-slate-100',
        iconBg: 'bg-emerald-50 text-emerald-600',
        hasBgImage: false,
    },
    {
        title: 'Proteksi IP66',
        subtitle: 'Daya Tahan Ekstrem',
        description: 'Didesain untuk bertahan di cuaca tropis ekstrem Indonesia.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 11m8 4V11" />
            </svg>
        ),
        colSpan: 'lg:col-span-2',
        rowSpan: 'lg:row-span-1',
        bgClasses: 'bg-slate-50',
        border: 'border-slate-100',
        iconBg: 'bg-purple-50 text-purple-600',
        hasBgImage: false,
    }
];

export default function FeaturesBento() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
            {/* Background Effects */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_40%)]" /> */}

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">

                {/* Header */}
                <div className={`mb-20 max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex h-[2px] w-12 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Teknologi & Inovasi</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                        Fitur Unggulan <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                            Kelas Dunia.
                        </span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px] lg:auto-rows-[220px]">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            className={`
                                group relative rounded-3xl p-8 overflow-hidden
                                shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500
                                border ${feature.colSpan} ${feature.rowSpan} ${feature.bgClasses} ${feature.border}
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                            `}
                        >
                            {/* Card Background Gradient */}
                            {/* <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} /> */}

                            {/* Optional Bg Image */}
                            {feature.hasBgImage && (
                                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 mix-blend-multiply">
                                    <Image
                                        src="/images/tech_feature_bg.png"
                                        alt="background pattern"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm ${feature.iconBg}`}>
                                        {feature.icon}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        {feature.subtitle}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Border Glow (Pseudo-like) */}
                            {/* <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none group-hover:border-white/20 transition-colors duration-500" /> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

