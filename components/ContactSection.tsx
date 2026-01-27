import Link from 'next/link';

export default function ContactSection() {
    return (
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
            {/* Simple Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">

                {/* Header Content */}
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest border border-orange-500/20">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        Ready to Switch?
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Mulai Perjalanan <span className="text-orange-500">Energi Bersih</span> Anda.
                    </h2>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Konsultasikan kebutuhan sistem PLTS Anda dengan tim ahli kami. Kami siap membantu merancang solusi energi terbaik untuk hunian maupun bisnis Anda.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all hover:shadow-lg hover:shadow-orange-600/25 group"
                        >
                            Hubungi Kami Sekarang
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full transition-all border border-slate-700"
                        >
                            Lihat Katalog
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 border-y border-slate-800 py-8 mb-12">
                    <div>
                        <h4 className="text-2xl md:text-3xl font-black text-white">10k+</h4>
                        <p className="text-xs md:text-sm text-slate-500 uppercase tracking-wider font-medium">Installations</p>
                    </div>
                    <div>
                        <h4 className="text-2xl md:text-3xl font-black text-white">15+</h4>
                        <p className="text-xs md:text-sm text-slate-500 uppercase tracking-wider font-medium">Years Exp</p>
                    </div>
                    <div>
                        <h4 className="text-2xl md:text-3xl font-black text-white">24/7</h4>
                        <p className="text-xs md:text-sm text-slate-500 uppercase tracking-wider font-medium">Support</p>
                    </div>
                </div>

                {/* Simplified Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">Butuh Bantuan Cepat?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="tel:+622112345678" className="group p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-600 group-hover:text-white text-slate-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Hotline</p>
                            <p className="text-sm font-semibold text-white mt-1">+62 21 1234 5678</p>
                        </a>

                        <a href="mailto:support@solisinverter.id" className="group p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-600 group-hover:text-white text-slate-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Email</p>
                            <p className="text-sm font-semibold text-white mt-1">support@solisinverter.id</p>
                        </a>

                        <a href="https://wa.me/628123456789" className="group p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-green-500/50 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white text-slate-400 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase">WhatsApp</p>
                            <p className="text-sm font-semibold text-white mt-1">Chat Sekarang</p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
