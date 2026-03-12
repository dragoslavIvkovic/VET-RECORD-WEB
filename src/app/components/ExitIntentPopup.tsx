'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { detectMobileOS } from '@/lib/smart-app-banner';
import AppDownloadButtons from '@/app/components/AppDownloadButtons';

const DISMISSAL_KEY = 'vetrecord_exit_intent_dismissed';
const DISMISSAL_DAYS = 7;

export default function ExitIntentPopup() {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const posthog = usePostHog();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Desktop only check
        if (detectMobileOS() !== null) return;
        if (window.innerWidth <= 768) return;

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

        const handleMouseLeave = (e: MouseEvent) => {
            // Check if mouse left from the top of the window
            if (e.clientY <= 10 && !visible) {
                setVisible(true);
                posthog.capture('exit_intent_popup_shown');
                
                // Remove listener once triggered so it doesn't show multiple times per session
                document.removeEventListener('mouseleave', handleMouseLeave);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [mounted, visible, posthog]);

    const handleDismiss = () => {
        try {
            localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
        } catch {
            // ignore
        }
        setVisible(false);
        posthog.capture('exit_intent_popup_dismissed');
    };

    if (!mounted || !visible) return null;

    return (
        <div
            className='fixed inset-0 z-[10000] flex items-center justify-center p-4'
            role='dialog'
            aria-modal='true'
            aria-labelledby='exit-popup-title'
        >
            <div
                className='absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in'
                onClick={handleDismiss}
                aria-hidden='true'
            />
            <div className='relative w-full max-w-lg animate-in fade-in zoom-in-95 rounded-2xl bg-white p-8 shadow-2xl overflow-hidden'>
                {/* Close button */}
                <button
                    type='button'
                    onClick={handleDismiss}
                    className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 z-10'
                    aria-label='Dismiss popup'
                >
                    <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>

                <div className='flex flex-col items-center text-center'>
                    <div className='relative mb-5 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#0C4C55] shadow-md'>
                        <Image
                            src='/logo.svg'
                            alt='Vet Record Logo'
                            width={54}
                            height={54}
                            className='object-contain p-1'
                        />
                    </div>

                    <h2 id='exit-popup-title' className='mb-3 text-3xl font-extrabold text-gray-900 tracking-tight'>
                        Wait! Before you go...
                    </h2>
                    
                    <p className='mb-8 text-base leading-relaxed text-gray-600 px-4'>
                        Don&apos;t leave without giving your pet the care they deserve. Join thousands of pet owners who use Vet Record to track vaccinations, medicines, and medical history.
                    </p>

                    <div className='w-full'>
                        <AppDownloadButtons 
                            source='exit_intent_popup' 
                            containerClassName='flex flex-col items-center justify-center gap-4 sm:flex-row' 
                            imageClassName='h-12 w-auto' 
                        />
                    </div>
                    
                    <button 
                        onClick={handleDismiss}
                        className='mt-6 text-sm font-medium text-gray-400 hover:text-gray-600 underline underline-offset-4'
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
