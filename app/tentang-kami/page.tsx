import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Tentang Kami',
    description: 'Pelajari lebih lanjut tentang Solis Inverter Indonesia - Mitra terpercaya Anda untuk solusi energi tenaga surya.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white relative">
            {/* Page Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden z-10 bg-orange-50/50">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]" />

                {/* Decorative plus signs */}
                <div className="absolute top-20 left-[10%] text-orange-200 opacity-40 select-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M19 0h2v40h-2z" /><path d="M0 19h40v2H0z" />
                    </svg>
                </div>
                <div className="absolute bottom-20 right-[15%] text-orange-200 opacity-40 select-none">
                    <svg width="30" height="30" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M19 0h2v40h-2z" /><path d="M0 19h40v2H0z" />
                    </svg>
                </div>

                <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
                            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600 font-black">Tentang Kami</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tight leading-[1.1] mb-8 capitalize">
                            Tentang <span className="text-orange-500">Solis Indonesia</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                            Kami adalah distributor resmi Solis Inverter di Indonesia, menghadirkan teknologi inverter tercanggih untuk kebutuhan panel surya Anda.
                        </p>
                    </div>
                </div>
            </section>

            <div className="relative z-10 bg-white w-full">
                <section className="max-w-4xl mx-auto px-8 py-20">
                    <div className="prose prose-lg prose-orange max-w-none">
                        <p className="text-gray-600 leading-relaxed text-xl">
                            Kami adalah distributor resmi Solis Inverter di Indonesia, menghadirkan teknologi inverter
                            tercanggih untuk kebutuhan panel surya Anda.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            Dengan pengalaman bertahun-tahun di industri energi terbarukan, kami berkomitmen untuk
                            memberikan solusi terbaik bagi kebutuhan energi masa depan Indonesia.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            Solis Inverter dikenal secara global sebagai salah satu produsen string inverter terbesar di dunia. Produk kami telah teruji di berbagai kondisi ekstrem dan memberikan performa yang stabil serta efisiensi tinggi.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
