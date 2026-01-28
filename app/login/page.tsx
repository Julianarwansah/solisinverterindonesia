'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login gagal. Silakan periksa kembali email dan password Anda.');
            }

            // Redirect to home or admin dashboard once implemented
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-orange-50/30 flex items-center justify-center p-6 font-sans">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-xl relative z-10">
                <div className="bg-white rounded-[60px] p-8 md:p-16 shadow-2xl shadow-orange-500/10 border border-white">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
                            <div className="relative w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center p-2 group-hover:bg-orange-100 transition-colors">
                                <Image
                                    src="/images/solisindonesialogo.png"
                                    alt="Solis Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-black text-gray-900 tracking-tight">Solis Indonesia</span>
                        </Link>
                        <h1 className="text-4xl font-[1000] text-gray-950 mb-4 tracking-tight">Admin Login</h1>
                        <p className="text-gray-500 font-medium tracking-tight">Masuk untuk mengelola produk dan artikel</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-shake">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nama@email.com"
                                required
                                className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-orange-500 outline-none transition-all font-medium text-gray-950 placeholder:text-gray-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-6 bg-gray-950 text-white rounded-[24px] font-[1000] uppercase tracking-[0.2em] shadow-2xl shadow-gray-950/20 hover:bg-orange-600 hover:shadow-orange-500/30 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </>
                            ) : 'Masuk Sekarang'}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </main>
    );
}
