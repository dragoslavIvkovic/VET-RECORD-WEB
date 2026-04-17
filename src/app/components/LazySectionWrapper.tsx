'use client';

import { type ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
    children: ReactNode;
    /** min-height skeleton to prevent CLS before the section loads */
    minHeight: string;
    /** extra classes forwarded to both skeleton and live wrapper */
    className?: string;
    /** how far before entering the viewport to trigger load (default 300px) */
    rootMargin?: string;
};

export default function LazySectionWrapper({
    children,
    minHeight,
    className = '',
    rootMargin = '300px'
}: Props) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin
    });

    // Always reserve minHeight so removing the placeholder when `inView` flips does not
    // collapse the section and shift content below (major CLS source on mobile).
    return (
        <div ref={ref} className={className} style={{ minHeight }}>
            {inView ? children : null}
        </div>
    );
}
