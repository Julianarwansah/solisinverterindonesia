'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-0 lg:min-h-screen flex items-center bg-[#FAFAFA] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative w-full pt-12 md:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content Column */}
                    <div className={`space-y-10 transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1) transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-orange-100 rounded-full shadow-sm">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-orange-600 text-[10px] md:text-sm font-black tracking-widest uppercase">
                                    Pionir Teknologi Inverter Global
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-7xl font-[1000] text-gray-900 leading-[1.05] tracking-tight">
                                Inverter Cerdas untuk <br />
                                <span className="text-orange-500">Sistem Panel Surya Anda</span>
                            </h2>

                            <p className="text-gray-500 text-base md:text-xl leading-relaxed max-w-xl font-medium">
                                Optimalkan performa **panel surya** Anda dengan teknologi string inverter dari Solis. Kami menghadirkan solusi konversi energi terpercaya untuk sistem PLTS perumahan hingga skala industri di Indonesia.
                            </p>
                        </div>
                    </div>

                    {/* Right Visual Column */}
                    <div className={`flex flex-col gap-10 transition-all duration-[1500ms] delay-500 cubic-bezier(0.2, 0.8, 0.2, 1) transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                        <div className="relative aspect-[16/10] lg:aspect-[16/11] rounded-[48px] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.15)] bg-gray-100 group">
                            <Image
                                src="/images/about_main.png"
                                alt="Instalasi Inverter Solis"
                                fill
                                className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                            {/* Floating Tech Badge */}
                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-xl p-5 md:p-7 rounded-[32px] shadow-2xl border border-white/50 animate-float invisible sm:visible">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-gray-900 leading-none">AFCI 2.0</div>
                                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Keamanan Proteksi Petir</div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Label Content */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-white/10 backdrop-blur-xl px-8 py-5 rounded-[32px] border border-white/20">
                                    <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-1.5">Solis Cloud Platform</p>
                                    <p className="text-white text-lg md:text-2xl font-black tracking-tight leading-tight">Monitoring Energi Real-time 2025</p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2">
                            <div className="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 group-hover:rotate-12 transition-transform shadow-inner">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900 text-base">Efisiensi Tinggi</h4>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Konversi Daya Maksimum</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0 group-hover:-rotate-12 transition-transform shadow-inner">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900 text-base">Layanan Lokal</h4>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Dukungan Resmi Indonesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
