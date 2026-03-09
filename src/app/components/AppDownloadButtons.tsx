'use client';

import { usePostHog } from 'posthog-js/react';
import { APP_LINKS } from '../config/links';

interface AppDownloadButtonsProps {
    source: string;
    containerClassName?: string;
    imageClassName?: string;
}

export default function AppDownloadButtons({ 
    source, 
    containerClassName = 'flex items-center gap-4',
    imageClassName = 'h-12'
}: AppDownloadButtonsProps) {
    const posthog = usePostHog();

    const trackClick = (platform: 'android' | 'ios') => {
        posthog.capture('app_download_clicked', { platform, source });
        (window as any).gtag?.('event', platform === 'android' ? 'click_play_store' : 'click_app_store', { 
            'page_path': window.location.pathname 
        });
    };

    return (
        <div className={containerClassName}>
            <a
                href={APP_LINKS.GOOGLE_PLAY}
                target='_blank'
                rel='noopener noreferrer'
                className='transition hover:scale-105 active:scale-95'
                onClick={() => trackClick('android')}
            >
                <img 
                    src='/images/download/googleplay.png' 
                    alt='Get Vet Record Pet Health Tracker on Google Play' 
                    className={imageClassName} 
                />
            </a>
            <a
                href={APP_LINKS.APP_STORE}
                target='_blank'
                rel='noopener noreferrer'
                className='transition hover:scale-105 active:scale-95'
                onClick={() => trackClick('ios')}
            >
                <img 
                    src='/images/download/appstore.png' 
                    alt='Download Vet Record Pet Health Tracker on the App Store' 
                    className={imageClassName} 
                />
            </a>
        </div>
    );
}
