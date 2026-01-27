import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn more about Solis Inverter Indonesia - Your trusted partner for solar energy solutions.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen p-8 sm:p-20">
            <main className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About Solis Indonesia</h1>
                <div className="prose prose-lg">
                    <p className="text-gray-600 leading-relaxed">
                        Kami adalah distributor resmi Solis Inverter di Indonesia, menghadirkan teknologi inverter
                        tercanggih untuk kebutuhan panel surya Anda.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-4">
                        Dengan pengalaman bertahun-tahun di industri energi terbarukan, kami berkomitmen untuk
                        memberikan solusi terbaik bagi kebutuhan energi masa depan Indonesia.
                    </p>
                </div>
            </main>
        </div>
    );
}
