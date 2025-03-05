'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const [isContactPage, setIsContactPage] = useState(false);

    // Check if we're on the contact page
    useEffect(() => {
        setIsContactPage(pathname === '/contact' || document.body.classList.contains('contact-page'));
    }, [pathname]);

    // Function to track scroll position
    const toggleVisibility = useCallback(() => {
        // Check again if we're on the contact page (in case the class changes)
        const isOnContactPage = pathname === '/contact' || document.body.classList.contains('contact-page');

        // Don't show the button if we're on the contact page
        if (isOnContactPage) {
            setIsVisible(false);
            return;
        }

        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [pathname]);

    // Function to scroll to top
    const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // Initial check for visibility
        toggleVisibility();

        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [toggleVisibility]);

    // Don't show anything if we're on the contact page
    if (isContactPage) {
        return null;
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    type='button'
                    className='fixed right-8 bottom-8 z-50 rounded-full bg-[#0C4C55] p-4 text-white shadow-lg transition-all hover:bg-[#0a3d44]'
                    aria-label='Scroll to top'>
                    <svg
                        className='h-6 w-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-labelledby='scrollTopTitle'>
                        <title id='scrollTopTitle'>Scroll to top</title>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 10l7-7m0 0l7 7m-7-7v18'
                        />
                    </svg>
                </button>
            )}
        </>
    );
}
