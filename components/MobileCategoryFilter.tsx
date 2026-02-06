'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MobileCategoryFilterProps {
    categories: any[];
    currentSlug?: string;
    totalProducts?: number;
}

export default function MobileCategoryFilter({ categories, currentSlug, totalProducts = 0 }: MobileCategoryFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};

        // Helper to find all parents of the current slug
        const expandPath = (slug: string) => {
            let current = categories.find(c => c.slug === slug);
            const visited = new Set<string>(); // Cycle detection

            while (current && current.parent_id) {
                const currentId = current.id.toString();
                if (visited.has(currentId)) break; // Prevent infinite loop
                visited.add(currentId);

                const parentId = current.parent_id.toString();
                initialState[parentId] = true;
                current = categories.find(c => c.id.toString() === parentId);
            }
        };

        if (currentSlug) {
            expandPath(currentSlug);
        }
        return initialState;
    });

    const toggleCategory = (id: string | number) => {
        setOpenCategories(prev => ({
            ...prev,
            [id.toString()]: !prev[id.toString()]
        }));
    };

    const rootCategories = categories.filter(cat => !cat.parent_category);

    return (
        <div className="lg:hidden mt-8 px-6 -mx-6">
            {/* Header - Always Visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-5 border-2 border-orange-200/50 transition-all hover:shadow-md active:scale-[0.99]"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-wider">Filter Kategori</p>
                            <p className="text-sm font-bold text-gray-900">Pilih Kategori Produk</p>
                        </div>
                    </div>
                    <svg
                        className={`w-5 h-5 text-orange-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Collapsible Content */}
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white rounded-b-3xl px-5 pb-5 border-x-2 border-b-2 border-gray-100 -mt-3 pt-5 space-y-2">
                    {/* Semua Produk */}
                    <Link
                        href="/produk"
                        className={`flex items-center justify-between group px-4 py-3 rounded-2xl transition-all ${!currentSlug
                            ? 'bg-gray-950 text-white shadow-lg shadow-gray-950/20 font-black'
                            : 'bg-white text-gray-600 hover:text-orange-600 border border-gray-100 font-bold'
                            }`}
                    >
                        <span className="text-sm">Semua Produk</span>
                        {totalProducts > 0 && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${!currentSlug ? 'bg-white/20' : 'bg-gray-100'}`}>
                                {totalProducts}
                            </span>
                        )}
                    </Link>

                    {/* Categories */}
                    {rootCategories.map((cat) => (
                        <CategoryNode
                            key={cat.id}
                            category={cat}
                            allCategories={categories}
                            currentSlug={currentSlug}
                            openCategories={openCategories}
                            toggleCategory={toggleCategory}
                            level={0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryNode({ category, allCategories, currentSlug, openCategories, toggleCategory, level }: any) {
    const subCategories = allCategories.filter((sub: any) => sub.parent_id?.toString() === category.id.toString());
    const isExpanded = openCategories[category.id.toString()];
    const isActive = category.slug === currentSlug;

    // Check if any descendant is active
    const hasActiveDescendant = (cat: any): boolean => {
        const children = allCategories.filter((sub: any) => sub.parent_id?.toString() === cat.id.toString());
        return children.some((child: any) => child.slug === currentSlug || hasActiveDescendant(child));
    };

    const isParentActive = hasActiveDescendant(category);

    return (
        <div className="space-y-2">
            <div className="relative group">
                <Link
                    href={`/produk/kategori/${category.slug}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all font-black pr-12 ${isActive
                        ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-500/20'
                        : isParentActive
                            ? 'bg-orange-50/50 border-orange-200 text-orange-600'
                            : 'bg-white border-gray-100 hover:border-orange-200 text-gray-900'
                        }`}
                >
                    <span className={level > 0 ? 'text-[13px]' : 'text-sm'}>{category.name}</span>
                </Link>

                {subCategories.length > 0 && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleCategory(category.id);
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl transition-all ${isExpanded
                            ? (isActive ? 'bg-white/20 text-white rotate-180' : 'bg-orange-500 text-white rotate-180')
                            : (isActive ? 'text-white/60 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-100')
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}
            </div>

            {subCategories.length > 0 && (
                <div
                    className={`space-y-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100 py-1' : 'max-h-0 opacity-0 py-0'}`}
                    style={{ paddingLeft: '1.25rem', borderLeft: '2px solid rgba(249, 115, 22, 0.1)', marginLeft: '1rem' }}
                >
                    {subCategories.map((sub: any) => (
                        <CategoryNode
                            key={sub.id}
                            category={sub}
                            allCategories={allCategories}
                            currentSlug={currentSlug}
                            openCategories={openCategories}
                            toggleCategory={toggleCategory}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
