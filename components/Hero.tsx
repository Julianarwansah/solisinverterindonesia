'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full pt-8 pb-32 md:pt-12 md:pb-40 overflow-hidden bg-white">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Side: Pill Image Gallery */}
        <div className="lg:col-span-7 relative flex justify-center lg:justify-start gap-2 md:gap-5 h-[350px] sm:h-[450px] md:h-[650px] items-center">
          {/* Pill 1 */}
          <div className="relative w-16 sm:w-24 md:w-36 h-[60%] rounded-full overflow-hidden shadow-2xl translate-y-8 md:translate-y-12 transition-transform duration-700 hover:-translate-y-2 animate-float">
            <Image
              src="/images/hero1.png"
              alt="Modern Solar House"
              fill
              className="object-cover scale-110"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Pill 2 (Tallest) */}
          <div className="relative w-20 sm:w-32 md:w-52 h-[90%] rounded-full border-4 md:border-[6px] border-white overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] -translate-y-4 md:-translate-y-6 transition-transform duration-700 hover:-translate-y-10 animate-float-delayed">
            <Image
              src="/images/hero2.png"
              alt="Solis Inverter Premium"
              fill
              className="object-cover scale-105"
            />
          </div>

          {/* Pill 3 */}
          <div className="relative w-18 sm:w-28 md:w-44 h-[70%] rounded-full overflow-hidden shadow-2xl translate-y-12 md:translate-y-16 transition-transform duration-700 hover:translate-y-10 animate-float">
            <Image
              src="/images/hero3.png"
              alt="Solar Farm"
              fill
              className="object-cover scale-110"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Pill 4 - Hidden on very small screens */}
          <div className="hidden sm:block relative w-16 md:w-32 h-[50%] rounded-full overflow-hidden shadow-xl -translate-y-8 md:-translate-y-12 transition-transform duration-700 hover:-translate-y-16 animate-float-delayed">
            <Image
              src="/images/hero4.png"
              alt="Clean Energy Living"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="lg:col-span-5 flex flex-col space-y-8 md:space-y-10 lg:pl-12 text-center lg:text-left">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-bold text-xs md:text-sm tracking-wide uppercase mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Leading Inverter Solution
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-[900] text-gray-900 leading-[1.1] tracking-tight">
              Energy for <br className="hidden sm:block" />
              <span className="text-orange-500">
                Sustainable
              </span>
              <br className="hidden sm:block" />
              Future
            </h1>

            <p className="text-base md:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Sistem inverter cerdas untuk hunian masa depan. Menghadirkan efisiensi energi tanpa batas dengan teknologi Solis yang mendunia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-12 py-4 md:py-5 bg-orange-500 text-white font-black rounded-full text-base md:text-lg shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              Get in touch
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <Link
              href="/products"
              className="px-8 md:px-12 py-4 md:py-5 bg-white border-2 border-gray-100 text-gray-900 font-black rounded-full text-base md:text-lg hover:border-orange-500 hover:text-orange-500 transition-all duration-300 flex items-center justify-center"
            >
              Explore
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="pt-6 md:pt-8 flex items-center justify-center lg:justify-start gap-6 md:gap-8 border-t border-gray-100">
            <div>
              <div className="text-xl md:text-2xl font-black text-gray-900">10k+</div>
              <div className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-wider">Happy Homes</div>
            </div>
            <div className="w-px h-8 md:h-10 bg-gray-100" />
            <div>
              <div className="text-xl md:text-2xl font-black text-gray-900">99.9%</div>
              <div className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-wider">Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(var(--tw-translate-y)); }
          50% { transform: translateY(calc(var(--tw-translate-y) - 20px)); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        :global(body) {
          background-color: white !important;
        }
      `}</style>
    </section>
  );
}
