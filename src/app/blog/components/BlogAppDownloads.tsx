'use client';

import { APP_LINKS } from '@/app/config/links';
import { usePostHog } from 'posthog-js/react';

export default function BlogAppDownloads() {
    const posthog = usePostHog();

    return (
        <div className='flex flex-col items-center gap-4 rounded-2xl bg-[#F3F5FF] p-8 text-center sm:p-10'>
            <h3 className='text-xl leading-tight font-bold text-[#0C4C55] sm:text-2xl'>
                Ready to take better care of your pet?
            </h3>
            <p className='text-sm leading-relaxed text-gray-600 sm:text-base'>
                Download the Vet Record app to track medical records, set vaccination reminders, and log daily activities.
            </p>
            
            <div className='mt-4 flex flex-wrap items-center justify-center gap-3'>
                <a
                    href={APP_LINKS.GOOGLE_PLAY}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition hover:opacity-80 hover:scale-105'
                    onClick={() => {
                        posthog.capture('app_download_clicked', { platform: 'android', source: 'blog_post' });
                        (window as any).gtag?.('event', 'click_play_store', { 'page_path': window.location.pathname });
                    }}>
                    <img src='/images/download/googleplay.png' alt='Get it on Google Play' className='h-12' />
                </a>
                <a
                    href={APP_LINKS.APP_STORE}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition hover:opacity-80 hover:scale-105'
                    onClick={() => {
                        posthog.capture('app_download_clicked', { platform: 'ios', source: 'blog_post' });
                        (window as any).gtag?.('event', 'click_app_store', { 'page_path': window.location.pathname });
                    }}>
                    <img src='/images/download/appstore.png' alt='Download on the App Store' className='h-12' />
                </a>
            </div>
        </div>
    );
}
