import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminClientLayout from '@/components/admin/AdminClientLayout';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return <AdminClientLayout>{children}</AdminClientLayout>;
}
