import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Tentang Kami',
    description: 'Pelajari lebih lanjut tentang Solis Inverter Indonesia - Mitra terpercaya Anda untuk solusi energi tenaga surya.',
};

export default function AboutPage() {
    const stats = [
        { value: '50+', label: 'Negara', sub: 'Jangkauan Global' },
        { value: '10M+', label: 'Inverter', sub: 'Terpasang Worldwide' },
        { value: '98.7%', label: 'Efisiensi', sub: 'Tertinggi di Kelasnya' },
        { value: '15+', label: 'Tahun', sub: 'Garansi Premium' },
    ];

    const coreValues = [
        { title: 'Efisiensi', desc: 'Memaksimalkan efisiensi konversi energi untuk kinerja optimal dan penghematan biaya.' },
        { title: 'Inovasi', desc: 'Mempelopori teknologi string canggih dan solusi pemantauan cerdas.' },
        { title: 'Saintifik', desc: 'Pendekatan berbasis penelitian dengan kapabilitas R&D kelas dunia.' },
        { title: 'Hijau', desc: 'Berkomitmen pada keberlanjutan lingkungan dan pengurangan emisi karbon.' },
        { title: 'Humanistik', desc: 'Pendekatan yang berpusat pada manusia dengan tim ahli lokal yang berdedikasi.' },
        { title: 'Internasional', desc: 'Kehadiran global dengan adaptasi regional dan sertifikasi internasional.' },
        { title: 'Integritas', desc: 'Membangun kepercayaan melalui praktik bisnis yang transparan dan dukungan finansial yang kuat.' },
        { title: 'Toleransi', desc: 'Merangkul keberagaman dan membina kemitraan inklusif di seluruh dunia.' },
    ];

    const timeline = [
        { year: '2005', title: 'Pendirian Perusahaan', desc: 'Solis didirikan dengan visi untuk menyediakan solusi energi terbarukan yang terjangkau dan berkualitas tinggi.' },
        { year: '2010', title: 'Ekspansi Global', desc: 'Memperluas jangkauan ke lebih dari 20 negara di seluruh dunia dengan produk inverter inovatif.' },
        { year: '2015', title: 'Pencapaian 5 Juta Unit', desc: 'Mencapai milestone produksi 5 juta unit inverter terpasang di seluruh dunia.' },
        { year: '2020', title: 'Teknologi Hybrid Terdepan', desc: 'Meluncurkan inverter hybrid generasi terbaru dengan efisiensi hingga 98.7% dan fitur smart monitoring.' },
        { year: '2024', title: '10 Juta Inverter di Seluruh Dunia', desc: 'Mencatat sejarah dengan lebih dari 10 juta inverter terpasang di 50+ negara, membantu mengurangi emisi karbon global.' },
    ];

    return (
        <main className="min-h-screen bg-white relative font-sans">
            {/* 1. Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden z-10 bg-orange-50/50">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-white border border-orange-100 rounded-full text-orange-600 text-xs font-black uppercase tracking-[0.2em] mb-12 shadow-sm animate-fade-in">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                        Produsen Inverter PV Terbesar Ketiga di Dunia
                    </div>

                    <h1 className="text-6xl md:text-8xl font-[1000] text-gray-950 tracking-tight leading-[0.95] mb-12">
                        Mengubah Sinar Matahari<br />
                        <span className="text-orange-500">Menjadi Masa Depan</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-4xl mx-auto leading-relaxed mb-16">
                        Didirikan pada tahun 2005 sebagai Ginlong (Solis), kami adalah produsen inverter PV terbesar ketiga di dunia, menyediakan solusi penyimpanan energi dan tenaga surya yang komprehensif untuk sektor residensial, komersial, dan utilitas dengan teknologi string yang inovatif.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <a href="https://wa.me/6281258885595" className="px-10 py-5 bg-gray-950 text-white rounded-2xl font-black transition-all hover:-translate-y-1 shadow-2xl shadow-gray-950/20">
                            Mari Berkolaborasi
                        </a>
                        <Link href="/produk" className="px-10 py-5 bg-white border border-gray-100 text-gray-900 rounded-2xl font-black transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-orange-500/5">
                            Jelajahi Produk
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Stats Section */}
            <section className="relative z-20 -mt-16 mb-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50 hover:border-orange-200 transition-all group">
                                <p className="text-5xl font-[1000] text-gray-950 mb-4 group-hover:text-orange-500 transition-colors">{stat.value}</p>
                                <p className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-xs text-gray-400 font-medium">{stat.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Story Section */}
            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10">
                                <Image
                                    src="/images/about_main.png"
                                    alt="Solis Factory"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500 rounded-[40px] -z-0 opacity-10 blur-3xl" />
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-100 rounded-full -z-0 opacity-20 blur-2xl" />
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-12 h-0.5 bg-orange-500" />
                                <span className="text-xs font-black text-orange-500 uppercase tracking-[0.3em]">📖 Cerita Kami</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-[1000] text-gray-950 mb-8 tracking-tight">
                                Perjalanan Menuju <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 italic">Energi Berkelanjutan</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
                                <p>
                                    Didirikan pada tahun 2005 sebagai Ginlong (Solis) dengan kode saham 300763.SZ, kami telah tumbuh menjadi produsen inverter PV terbesar ketiga di dunia, berkomitmen untuk menyediakan penyimpanan energi inovatif dan solusi tenaga surya di sektor residensial, komersial, dan utilitas.
                                </p>
                                <p>
                                    Dengan rantai pasokan global kami, kemampuan R&D kelas dunia, dan keahlian adaptasi regional, kami melayani pelanggan di lebih dari 50 negara dengan tim ahli lokal yang berdedikasi dan dukungan finansial yang kuat, membantu jutaan orang bertransisi ke solusi energi berkelanjutan.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-12">
                                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                                    <p className="text-4xl font-[1000] text-orange-600 mb-1">2005</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tahun Berdiri</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-4xl font-[1000] text-gray-950 mb-1">20GW+</p>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Kapasitas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Vision & Mission Section */}
            <section className="py-32 bg-gray-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-500 rounded-full blur-[200px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">
                            <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            🎯 Tujuan Kami
                        </div>
                        <h2 className="text-5xl md:text-7xl font-[1000] tracking-tight">Visi & Misi</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                        {/* Vision */}
                        <div className="bg-white/5 backdrop-blur-sm p-16 rounded-[60px] border border-white/10 hover:border-orange-500/50 transition-all group">
                            <div className="w-20 h-20 bg-orange-500 rounded-[28px] flex items-center justify-center mb-10 shadow-2xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black mb-8">Visi Kami</h3>
                            <p className="text-xl text-slate-300 leading-relaxed font-medium">
                                Menjadi penyedia solusi energi terbarukan terkemuka yang mendorong transisi dunia menuju energi bersih dan berkelanjutan melalui inovasi teknologi dan komitmen terhadap kualitas.
                            </p>
                        </div>

                        {/* Mission */}
                        <div className="p-8">
                            <h3 className="text-3xl font-black mb-12 flex items-center gap-6">
                                <span className="w-16 h-1 bg-orange-500 rounded-full" />
                                Misi Kami
                            </h3>
                            <div className="space-y-8">
                                {[
                                    'Mengembangkan teknologi untuk memberdayakan dunia dengan energi bersih',
                                    'Menyediakan solusi penyimpanan energi dan tenaga surya yang komprehensif',
                                    'Mendukung transisi energi global dengan teknologi string yang inovatif',
                                    'Memberikan sertifikasi internasional dan adaptasi regional'
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors">
                                            <svg className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-lg text-slate-300 font-medium group-hover:text-white transition-colors">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Core Values Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">
                            💎 Core Values
                        </div>
                        <h2 className="text-5xl md:text-6xl font-[1000] text-gray-950 mb-6 tracking-tight">Nilai-Nilai Perusahaan</h2>
                        <p className="text-gray-400 font-medium max-w-2xl mx-auto">Prinsip fundamental yang menjadi pondasi setiap keputusan dan tindakan kami</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((value, i) => (
                            <div key={i} className="group p-10 rounded-[40px] bg-gray-50 border border-transparent hover:bg-white hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                                    <span className="text-xs font-black uppercase">{value.title[0]}</span>
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">{value.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Timeline Section */}
            <section className="py-32 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <div className="inline-flex items-center gap-2 text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-4">
                                ⏳ Perjalanan Kami
                            </div>
                            <h2 className="text-5xl md:text-6xl font-[1000] text-gray-950 mb-8 tracking-tight">Sejarah & Pencapaian</h2>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed">Momen-momen penting yang membentuk Solis menjadi pemimpin industri energi terbarukan dunia.</p>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="space-y-4">
                                {timeline.map((item, i) => (
                                    <div key={i} className="relative pl-12 pb-16 last:pb-0 group">
                                        {/* Line */}
                                        <div className="absolute left-[5.5px] top-4 bottom-0 w-[1px] bg-gray-200 group-last:hidden" />
                                        {/* Dot */}
                                        <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-gray-300 group-hover:bg-orange-500 border-4 border-white transition-all scale-100 group-hover:scale-150 box-content z-10" />

                                        <div className="p-10 bg-white rounded-[40px] border border-gray-100 group-hover:border-orange-200 transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-orange-500/5 group-hover:-translate-y-1">
                                            <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-[1000] mb-6 tracking-widest">{item.year}</span>
                                            <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h4>
                                            <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Final CTA Section */}
            <section className="py-32 mb-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="relative rounded-[80px] bg-gray-950 p-16 md:p-32 overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="text-orange-500 text-xs font-black uppercase tracking-[0.4em] mb-10">Bergabunglah dengan Revolusi Energi</div>
                            <h2 className="text-5xl md:text-7xl font-[1000] text-white tracking-tight leading-tight mb-10">
                                Siap Beralih ke <br /><span className="text-orange-500">Energi Bersih?</span>
                            </h2>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
                                Konsultasi gratis dengan expert kami dan dapatkan estimasi ROI untuk proyek energi surya Anda. Mari ciptakan masa depan berkelanjutan bersama!
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-8">
                                <a href="https://wa.me/6281258885595" className="px-12 py-6 bg-orange-500 text-white rounded-[32px] font-black uppercase tracking-widest text-sm hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-orange-600/30">
                                    Hubungi Kami Sekarang
                                </a>
                                <Link href="/produk" className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[32px] font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    Lihat Produk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

