import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Solis Inverter Indonesia',
    default: 'Solis Inverter Indonesia - Solusi Energi Terbarukan Terbaik',
  },
  description: "Distributor resmi Solis Inverter di Indonesia. Menghadirkan teknologi inverter tercanggih untuk kebutuhan panel surya Anda.",
  keywords: ["solis inverter", "inverter indonesia", "panel surya", "energi terbarukan", "solar panel inverter"],
  authors: [{ name: "Solis Indonesia" }],
  openGraph: {
    title: 'Solis Inverter Indonesia',
    description: 'Solusi energi terbarukan terbaik dengan Solis Inverter.',
    url: 'https://solisinverterindonesia.com', // Replace with real URL
    siteName: 'Solis Indonesia',
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
