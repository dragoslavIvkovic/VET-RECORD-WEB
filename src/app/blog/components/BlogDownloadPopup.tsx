'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { detectMobileOS, type MobileOS } from '@/lib/smart-app-banner';
import { APP_LINKS } from '@/app/config/links';
import AppDownloadButtons from '@/app/components/AppDownloadButtons';

const DISMISSAL_KEY = 'vetrecord_blog_popup_dismissed';
const DISMISSAL_DAYS = 7;

export default function BlogDownloadPopup() {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [os, setOs] = useState<MobileOS>(null);
    const posthog = usePostHog();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Check if previously dismissed
        const isDismissed = () => {
            try {
                const raw = localStorage.getItem(DISMISSAL_KEY);
                if (!raw) return false;
                const timestamp = parseInt(raw, 10);
                if (isNaN(timestamp)) return false;
                const sevenDaysMs = DISMISSAL_DAYS * 24 * 60 * 60 * 1000;

                return Date.now() - timestamp < sevenDaysMs;
            } catch {
                return false;
            }
        };

        if (isDismissed()) return;

        setOs(detectMobileOS());

        const handleScroll = () => {
            if (visible) return;

            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show after scrolling 30% of scrollable area, but not immediately
            const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
            
            if (scrollPercentage > 0.3) {
                // Add a small delay so it doesn't appear instantaneously upon hitting the mark
                setTimeout(() => {
                    setVisible(true);
                    posthog.capture('blog_download_popup_shown', { os: detectMobileOS() });
                }, 1000);
                // Remove listener once triggered
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mounted, visible, posthog]);

    const handleDismiss = () => {
        try {
            localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
        } catch {
            // ignore
        }
        setVisible(false);
        posthog.capture('blog_download_popup_dismissed');
    };

    if (!mounted || !visible) return null;

    const isDesktop = os === null;
    const installUrl = os === 'ios' ? APP_LINKS.APP_STORE : os === 'android' ? APP_LINKS.GOOGLE_PLAY : '#';

    return (
        <div
            className='fixed inset-0 z-[10000] flex items-center justify-center p-4'
            role='dialog'
            aria-modal='true'
            aria-labelledby='blog-popup-title'
        >
            <div
                className='absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in'
                onClick={handleDismiss}
                aria-hidden='true'
            />
            <div className='relative w-full max-w-sm animate-in fade-in zoom-in-95 rounded-2xl bg-white p-6 shadow-2xl overflow-hidden'>
                {/* Close button */}
                <button
                    type='button'
                    onClick={handleDismiss}
                    className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 z-10'
                    aria-label='Dismiss banner'
                >
                    <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>

                <div className='flex flex-col items-center text-center'>
                    <div className='relative mb-4 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#0C4C55] shadow-md'>
                        <Image
                            src='/logo.svg'
                            alt='Vet Record Logo'
                            width={44}
                            height={44}
                            className='object-contain p-1'
                        />
                    </div>

                    <h2 id='blog-popup-title' className='mb-2 text-xl font-bold text-[#0C4C55]'>
                        Enjoying the article?
                    </h2>
                    
                    <p className='mb-6 text-sm leading-relaxed text-gray-600 px-2'>
                        Take better care of your pet. Download the Vet Record app to track medical records, set reminders, and more.
                    </p>

                    <div className='w-full'>
                        {isDesktop ? (
                            <AppDownloadButtons 
                                source='blog_popup_desktop' 
                                containerClassName='flex flex-col items-center gap-3 sm:flex-row sm:justify-center' 
                                imageClassName='h-[42px] w-auto' 
                            />
                        ) : (
                            <a
                                href={installUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={() => {
                                    posthog.capture('app_download_clicked', { platform: os, source: 'blog_popup_mobile' });
                                }}
                                className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#0C4C55] px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#08353B] active:scale-95'
                            >
                                {os === 'ios' ? 'Download on App Store' : 'Get it on Google Play'}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
