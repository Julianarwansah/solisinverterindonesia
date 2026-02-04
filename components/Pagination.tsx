'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage;
            pages.push(
                <Link
                    key={i}
                    href={createPageURL(i)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all ${isActive
                            ? 'bg-orange-600 text-white shadow-xl shadow-orange-500/40 hover:scale-110'
                            : 'border border-gray-100 bg-gray-50/50 text-gray-500 hover:bg-white hover:border-orange-500 hover:text-orange-600 hover:shadow-xl hover:shadow-orange-500/5'
                        }`}
                >
                    {i}
                </Link>
            );
        }
        return pages;
    };

    return (
        <div className="mt-20 flex items-center justify-center gap-3">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    className="w-12 h-12 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-500 hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/5"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
            ) : (
                <div className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-200 cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
            )}

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    className="w-12 h-12 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-500 hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all hover:shadow-xl hover:shadow-orange-500/5"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            ) : (
                <div className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-200 cursor-not-allowed">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            )}
        </div>
    );
}
