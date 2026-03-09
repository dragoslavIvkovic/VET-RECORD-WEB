'use client';

import { APP_LINKS } from '../config/links';
import { usePostHog } from 'posthog-js/react';
import AppDownloadButtons from '../components/AppDownloadButtons';

export function ContactDownloadButtons() {
    const posthog = usePostHog();

    return (
        <AppDownloadButtons 
            source='contact_page' 
            containerClassName='mt-auto flex flex-col items-center justify-center gap-4 sm:flex-row' 
            imageClassName='mx-auto h-12 object-contain sm:h-14'
        />
    );
}

export function ContactEmailButton() {
    const posthog = usePostHog();

    return (
        <a
            href='mailto:support@vetrecord.app'
            className='mt-auto flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 font-bold tracking-wide text-white shadow-lg transition-all hover:bg-cyan-400 hover:shadow-cyan-500/50 active:scale-95'
            onClick={() => posthog.capture('contact_email_clicked')}>
            <span className='text-lg'>support@vetrecord.app</span>
            <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M14 5l7 7m0 0l-7 7m7-7H3' />
            </svg>
        </a>
    );
}
