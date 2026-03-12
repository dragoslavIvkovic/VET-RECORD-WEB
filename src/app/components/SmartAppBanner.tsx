'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { APP_LINKS } from '../config/links';
import {
    detectMobileOS,
    dismissBanner,
    isDesktop,
    shouldShowBanner,
    type MobileOS
} from '@/lib/smart-app-banner';

import AppDownloadButtons from './AppDownloadButtons';

export default function SmartAppBanner() {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [os, setOs] = useState<MobileOS>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const check = () => {
            if (shouldShowBanner()) {
                setVisible(true);
                setOs(detectMobileOS());
            }
        };
        check();
        window.addEventListener('cookie-consent-updated', check);
        return () => window.removeEventListener('cookie-consent-updated', check);
    }, [mounted]);

    const handleDismiss = () => {
        dismissBanner();
        setVisible(false);
    };

    const desktop = mounted && isDesktop();
    const installUrl = os === 'ios' ? APP_LINKS.APP_STORE : os === 'android' ? APP_LINKS.GOOGLE_PLAY : '#';
    const installLabel = os === 'ios' ? 'View' : 'Install';

    if (!mounted || !visible) return null;

    return (
        <div
            className='fixed bottom-0 left-0 right-0 z-[9998] animate-slide-up border-t border-gray-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md'
            role='banner'
            aria-label='Download Vet Record app'
        >
            <div className='relative mx-auto flex h-14 max-w-6xl items-center gap-3 pl-4 pr-12 py-2 md:gap-6 md:pr-14'>
                {/* Close button */}
                <button
                    type='button'
                    onClick={handleDismiss}
                    className='absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
                    aria-label='Dismiss banner'
                >
                    <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>

                {/* App icon */}
                <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#0C4C55]'>
                    <Image
                        src='/logo.svg'
                        alt=''
                        width={40}
                        height={40}
                        className='object-contain p-1.5'
                    />
                </div>

                {/* App info */}
                <div className='min-w-0 flex-1 pr-10'>
                    <p className='truncate text-sm font-semibold text-gray-900'>Vet Record</p>
                    <p className='flex items-center gap-1.5 truncate text-xs text-gray-500'>
                        <span>Track your pet&apos;s health easily</span>
                        <span className='shrink-0 flex items-center gap-0.5' aria-hidden>
                            <span className='text-amber-400'>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg key={i} className='inline h-2.5 w-2.5' viewBox='0 0 20 20' fill='currentColor'>
                                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                    </svg>
                                ))}
                            </span>
                            <span>4.5</span>
                        </span>
                    </p>
                </div>

                {/* Install – desktop: both stores; mobile: single button */}
                {desktop ? (
                    <AppDownloadButtons source='smart_app_banner_desktop' imageClassName='h-9' />
                ) : (
                    <a
                        href={installUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='shrink-0 rounded-lg bg-[#0C4C55] px-4 py-2 text-sm font-semibold text-white transition-colors active:scale-95 hover:bg-[#08353B]'
                    >
                        {installLabel}
                    </a>
                )}
            </div>
        </div>
    );
}
