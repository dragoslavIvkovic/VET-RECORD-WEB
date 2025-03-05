'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { ArrowUp } from 'lucide-react';

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
                    className='bg-primary hover:bg-primary/90 focus:ring-primary dark:bg-primary/90 dark:hover:bg-primary fixed right-8 bottom-8 z-50 rounded-full p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none'
                    aria-label='Scroll to top'>
                    <ArrowUp className='size-6' aria-hidden='true' />
                    <span className='sr-only'>Scroll to top of the page</span>
                </button>
            )}
        </>
    );
}
