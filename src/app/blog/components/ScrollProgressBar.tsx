'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function onScroll() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            role='progressbar'
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label='Reading progress'
            className='fixed left-0 top-0 z-[100] h-1 w-full bg-transparent'
        >
            <div
                className='h-full bg-gradient-to-r from-[#0C4C55] to-cyan-400 transition-[width] duration-100 ease-out'
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
