import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
