import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Kontak Kami | Solis Inverter Indonesia',
    description: 'Hubungi Solis Inverter Indonesia untuk konsultasi, dukungan teknis, atau pertanyaan seputar solusi energi tenaga surya.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white relative font-sans">
            {/* 1. Page Hero Section */}
            <section className="relative pt-20 pb-20 overflow-hidden z-10 bg-orange-50/50">
                {/* Background Decor */}
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/10 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8 font-bold uppercase tracking-widest">
                            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-orange-600 font-black tracking-widest">Kontak Kami</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-[1000] text-gray-950 tracking-tight leading-[0.95] mb-10">
                            Hubungi <span className="text-orange-500">Kami</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                            Tanyakan apa saja tentang Inverter Solis. Tim ahli kami siap membantu Anda beralih ke energi bersih.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 bg-white w-full py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="text-4xl font-black text-gray-950 mb-6 tracking-tight">Informasi Kontak</h2>
                                <p className="text-gray-500 font-medium text-lg leading-relaxed">
                                    Jangan ragu untuk menghubungi kami melalui salah satu saluran berikut atau kunjungi kantor kami langsung.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* WhatsApp Card */}
                                <a
                                    href="https://wa.me/6281258885595"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-6 p-8 bg-gray-50 rounded-[40px] border border-transparent hover:border-orange-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">WhatsApp</p>
                                        <p className="text-xl font-black text-gray-950">+62 812-5888-5595</p>
                                    </div>
                                </a>

                                {/* Email Card */}
                                <a
                                    href="mailto:jarwinnofficial@gmail.com"
                                    className="group flex items-center gap-6 p-8 bg-gray-50 rounded-[40px] border border-transparent hover:border-orange-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                        <p className="text-xl font-black text-gray-950">jarwinnofficial@gmail.com</p>
                                    </div>
                                </a>

                                {/* Address Card */}
                                <div className="group flex items-start gap-6 p-8 bg-gray-50 rounded-[40px] border border-transparent hover:border-orange-100 hover:bg-white hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white shrink-0 transition-all">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Alamat</p>
                                        <p className="text-lg font-black text-gray-950 leading-relaxed">
                                            BSD Ruko Boulevard, Jalan Raya Taman Tekhno Lt.2, Blok AA No. 7, Ciater, Kec. Serpong, Tangerang Selatan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7 bg-white rounded-[60px] p-8 md:p-16 border border-gray-100 shadow-2xl shadow-gray-200/50">
                            <h3 className="text-3xl font-black text-gray-950 mb-10 tracking-tight">Kirim Pesan</h3>
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan nama Anda"
                                            className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Alamat Email</label>
                                        <input
                                            type="email"
                                            placeholder="email@perusahaan.com"
                                            className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Judul Pesan</label>
                                    <input
                                        type="text"
                                        placeholder="Subjek pertanyaan"
                                        className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Isi Pesan</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Bagaimana kami bisa membantu Anda?"
                                        className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300 resize-none"
                                    />
                                </div>
                                <button className="w-full py-6 bg-gray-950 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-gray-950/20 hover:bg-orange-600 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all active:scale-95">
                                    Kirim Pesan Sekarang
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-3 mb-10">
                        <span className="w-12 h-0.5 bg-orange-500" />
                        <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Lokasi Kami</span>
                    </div>
                    <div className="rounded-[60px] overflow-hidden bg-gray-200 aspect-[21/9] shadow-2xl border-4 border-white relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.866085183313!2d106.663189!3d-6.321894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fba6d4ebbe7f%3A0x6a19f6a6c0c28476!2sRuko%20Boulevard%20BSD!5e0!3m2!1sid!2sid!4v1706428000000!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-1000 contrast-125 group-hover:contrast-100"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
