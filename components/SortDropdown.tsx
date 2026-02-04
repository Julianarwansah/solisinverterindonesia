'use client';

import { useState } from 'react';

interface SortDropdownProps {
    onSortChange?: (sortValue: string) => void;
}

export default function SortDropdown({ onSortChange }: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('newest');

    const sortOptions = [
        { value: 'newest', label: 'Produk Terbaru' },
        { value: 'oldest', label: 'Produk Terlama' },
        { value: 'name-asc', label: 'Nama A-Z' },
        { value: 'name-desc', label: 'Nama Z-A' },
    ];

    const handleSelect = (value: string) => {
        setSelectedSort(value);
        setIsOpen(false);
        if (onSortChange) {
            onSortChange(value);
        }
    };

    const selectedOption = sortOptions.find(opt => opt.value === selectedSort);

    return (
        <div className="flex items-center gap-4">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:block">Urutkan:</span>
            <div className="group relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 cursor-pointer hover:border-orange-500 transition-all flex items-center gap-4 shadow-sm hover:shadow-orange-500/5 min-w-[180px] justify-between"
                >
                    {selectedOption?.label}
                    <svg
                        className={`w-4 h-4 text-orange-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full px-5 py-3 text-left text-sm font-bold transition-all ${selectedSort === option.value
                                            ? 'bg-orange-50 text-orange-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
