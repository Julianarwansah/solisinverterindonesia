'use client';

import { useState, useRef, useEffect } from 'react';

interface ProductDescriptionProps {
    content: string;
}

export default function ProductDescription({ content }: ProductDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            // Check if content height exceeds the collapsed height (e.g., 300px)
            setIsOverflowing(contentRef.current.scrollHeight > 300);
        }
    }, [content]);

    return (
        <div className="relative">
            <div
                ref={contentRef}
                className={`prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px]' : 'max-h-[300px]'
                    }`}
            >
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            {isOverflowing && (
                <>
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
                    )}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 flex items-center gap-2 text-orange-600 font-bold text-sm hover:text-orange-700 transition-colors uppercase tracking-widest group"
                    >
                        {isExpanded ? (
                            <>
                                Sembunyikan Detail
                                <svg className="w-4 h-4 transform rotate-180 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </>
                        ) : (
                            <>
                                Baca Selengkapnya
                                <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}
