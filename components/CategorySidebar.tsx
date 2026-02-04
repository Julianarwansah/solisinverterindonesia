'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Category {
    id: string | number;
    name: string;
    slug: string;
    parent_category?: string | number | null;
}

interface CategorySidebarProps {
    categories: Category[];
    totalProducts: number;
    currentSlug?: string;
}

export default function CategorySidebar({ categories, totalProducts, currentSlug }: CategorySidebarProps) {
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
        // Automatically open the parent of the current category if any
        const initialState: Record<string, boolean> = {};
        const currentCat = categories.find(c => c.slug === currentSlug);
        if (currentCat?.parent_category) {
            initialState[currentCat.parent_category.toString()] = true;
        }
        return initialState;
    });

    const toggleCategory = (id: string | number) => {
        setOpenCategories(prev => ({
            ...prev,
            [id.toString()]: !prev[id.toString()]
        }));
    };

    const parentCategories = categories.filter(cat => !cat.parent_category);

    return (
        <div className="space-y-4">
            <Link
                href="/produk"
                className={`flex items-center justify-between group px-5 py-4 rounded-2xl transition-all hover:-translate-y-1 ${!currentSlug
                        ? 'bg-gray-950 text-white shadow-2xl shadow-gray-950/20 font-black'
                        : 'bg-white text-gray-600 hover:text-orange-600 border border-gray-100 font-bold'
                    }`}
            >
                <span className="text-sm">Semua Produk</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${!currentSlug ? 'bg-white/20' : 'bg-gray-100'}`}>
                    {totalProducts}
                </span>
            </Link>

            {parentCategories.map((parent) => {
                const subCategories = categories.filter(sub => sub.parent_category === parent.id);
                const isExpanded = openCategories[parent.id.toString()];
                const isActive = parent.slug === currentSlug || subCategories.some(s => s.slug === currentSlug);

                return (
                    <div key={parent.id} className="space-y-2">
                        <div className="relative group">
                            <Link
                                href={`/produk/kategori/${parent.slug}`}
                                className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all font-black pr-12 ${parent.slug === currentSlug
                                        ? 'bg-orange-50/50 border-orange-200 text-orange-600'
                                        : 'bg-white border-gray-100 hover:border-orange-200 text-gray-900'
                                    }`}
                            >
                                <span className="text-sm">{parent.name}</span>
                            </Link>

                            {/* Accordion Toggle Trigger */}
                            {subCategories.length > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleCategory(parent.id);
                                    }}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isExpanded ? 'bg-orange-500 text-white rotate-180' : 'text-gray-400 hover:bg-gray-100'
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Sub-categories items with smooth expansion */}
                        {subCategories.length > 0 && (
                            <div className={`pl-6 space-y-1 border-l-2 border-orange-100/50 ml-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100 py-1' : 'max-h-0 opacity-0 py-0'}`}>
                                {subCategories.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        href={`/produk/kategori/${sub.slug}`}
                                        className={`flex items-center justify-between group px-4 py-2.5 rounded-xl transition-all font-bold ${sub.slug === currentSlug
                                                ? 'bg-orange-50 text-orange-600'
                                                : 'text-gray-500 hover:text-orange-600 hover:bg-orange-50/30'
                                            }`}
                                    >
                                        <span className="text-[13px]">{sub.name}</span>
                                        <svg className={`w-3.5 h-3.5 transition-all text-orange-400 ${sub.slug === currentSlug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
