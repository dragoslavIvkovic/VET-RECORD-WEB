'use client';

import { APP_LINKS } from '@/app/config/links';
import { usePostHog } from 'posthog-js/react';
import AppDownloadButtons from '@/app/components/AppDownloadButtons';

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
            
            <div className='mt-4'>
                <AppDownloadButtons 
                    source='blog_post' 
                    containerClassName='flex flex-wrap items-center justify-center gap-3' 
                />
            </div>
        </div>
    );
}
