import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-12 rounded-[50px] shadow-sm border border-gray-100">
                <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">Inventory System</h2>
                <h1 className="text-5xl font-[1000] text-gray-950 tracking-tight">Tambah Kategori</h1>
                <p className="mt-4 text-xl font-medium text-gray-400 max-w-2xl">Organisir produk Anda dengan membuat kategori baru yang deskriptif.</p>
            </div>

            <CategoryForm />
        </div>
    );
}
