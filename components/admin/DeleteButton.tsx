'use client';

import { useState } from 'react';
import { useProductActions, useArticleActions, useCategoryActions } from '@/lib/admin-actions';

interface DeleteButtonProps {
    id: string;
    type: 'product' | 'article' | 'product_categories';
}

export default function DeleteButton({ id, type }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);
    const { removeProduct } = useProductActions();
    const { removeArticle } = useArticleActions();
    const { removeCategory } = useCategoryActions();

    const handleDelete = async () => {
        setLoading(true);
        if (type === 'product') {
            await removeProduct(id);
        } else if (type === 'article') {
            await removeArticle(id);
        } else if (type === 'product_categories') {
            await removeCategory(id);
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className={`p-4 bg-white border border-gray-200 text-gray-300 hover:text-red-600 hover:border-red-100 rounded-2xl transition-all shadow-sm active:scale-90 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Hapus Item"
        >
            {loading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )}
        </button>
    );
}
