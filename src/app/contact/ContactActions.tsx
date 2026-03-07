'use client';

import { APP_LINKS } from '../config/links';
import { usePostHog } from 'posthog-js/react';

export function ContactDownloadButtons() {
    const posthog = usePostHog();

    return (
        <div className='mt-auto flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <a
                href={APP_LINKS.GOOGLE_PLAY}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-transform hover:scale-105 active:scale-95'
                onClick={() => {
                    posthog.capture('app_download_clicked', { platform: 'android', source: 'contact_page' });
                    (window as any).gtag?.('event', 'click_play_store', { 'page_path': window.location.pathname });
                }}>
                <img
                    src='/images/download/googleplay.png'
                    alt='Get Vet Record Pet Health Tracker on Google Play'
                    className='mx-auto h-12 object-contain sm:h-14'
                />
            </a>
            <a
                href={APP_LINKS.APP_STORE}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-transform hover:scale-105 active:scale-95'
                onClick={() => {
                    posthog.capture('app_download_clicked', { platform: 'ios', source: 'contact_page' });
                    (window as any).gtag?.('event', 'click_app_store', { 'page_path': window.location.pathname });
                }}>
                <img
                    src='/images/download/appstore.png'
                    alt='Download Vet Record Pet Health Tracker on the App Store'
                    className='mx-auto h-12 object-contain sm:h-14'
                />
            </a>
        </div>
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
