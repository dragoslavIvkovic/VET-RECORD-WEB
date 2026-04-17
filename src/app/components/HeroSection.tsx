'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import { APP_LINKS } from '../config/links';
import AppDownloadButtons from './AppDownloadButtons';

// Navigator connection type augmentation for TypeScript
interface NetworkInformation {
    effectiveType?: string;
    saveData?: boolean;
}

declare global {
    interface Navigator {
        connection?: NetworkInformation;
        mozConnection?: NetworkInformation;
        webkitConnection?: NetworkInformation;
    }
}

export default function HeroSection() {
    const posthog = usePostHog();
    const [currentSlide, setCurrentSlide] = useState(0);

    // SSR-safe: default is always false so the "Default Hero" renders on server
    const [showVideoHero, setShowVideoHero] = useState(false);

    /** Matches hero phone mockup: ~320px mobile, ~half container on md+ */
    const sliderSizes =
        '(max-width: 767px) min(90vw, 320px), (max-width: 1536px) min(46vw, 520px), 520px';

    const slides = [
        { src: '/images/slider/slide-01.webp', alt: 'Vet Record app vaccination tracker screen for pets' },
        { src: '/images/slider/slide-02.webp', alt: 'Vet Record medication reminder screen for dogs and cats' },
        { src: '/images/slider/slide-03.webp', alt: 'Vet Record app showing vet visit history and medical notes' },
        { src: '/images/slider/slide-04.webp', alt: 'Vet Record pet medical records screen with health history' },
        { src: '/images/slider/slide-05.webp', alt: 'Vet Record smart reminders for pet vaccinations and medications' },
        { src: '/images/slider/slide-06.webp', alt: 'Vet Record mobile app interface for managing dog and cat health' },
        { src: '/images/slider/slide-07.webp', alt: 'Vet Record pet health tracking dashboard' },
        { src: '/images/slider/slide-08.webp', alt: 'Comprehensive pet health management app' },
        { src: '/images/slider/slide-09.webp', alt: 'Track vaccinations and vet visits easily' },
        { src: '/images/slider/slide-10.webp', alt: 'Vet Record - The best pet health app for Android and iOS' }
    ];

    // Slideshow timer — only runs in Default Hero state
    useEffect(() => {
        if (showVideoHero) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [showVideoHero]);

    // After mount, check network + screen conditions and switch to Video Hero if eligible
    useEffect(() => {
        const isDesktop = window.innerWidth >= 768;

        const connection =
            navigator.connection ??
            navigator.mozConnection ??
            navigator.webkitConnection;

        const isFastConnection =
            connection !== undefined &&
            connection !== null &&
            connection.effectiveType === '4g' &&
            !connection.saveData;

        if (isDesktop && isFastConnection) {
            setShowVideoHero(true);
        }
    }, []);

    /* ─────────────────────────────────────────────
       VIDEO HERO — desktop + fast connection only
       Full video, no scrim/overlay — only the
       App Store / Google Play buttons on top.
    ───────────────────────────────────────────── */
    if (showVideoHero) {
        return (
            <section
                className='relative min-h-[50vh] overflow-hidden bg-black md:min-h-[min(85vh,920px)]'
                aria-label='Hero'
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='absolute inset-0 h-full w-full object-cover'
                >
                    <source
                        src='/video/hero.mp4'
                        type='video/mp4'
                    />
                </video>

                <div className='absolute bottom-8 left-0 right-0 z-10 flex justify-center'>
                    <AppDownloadButtons source='hero_section' imageClassName='h-14' priority />
                </div>
            </section>
        );
    }

    /* ─────────────────────────────────────────────
       DEFAULT HERO — SSR initial render, mobile,
       slow connection, or unsupported API
    ───────────────────────────────────────────── */
    return (
        <section className='relative px-4 py-3 bg-[#0C4C55] overflow-hidden md:py-4'>
            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse' />
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000' />
            </div>

            <div className='container mx-auto px-4 relative z-10'>
                <div className='grid gap-3 md:gap-4 md:grid-cols-2 md:items-center'>
                    {/* Left Column - Text Content */}
                    <div className='z-10 space-y-2 text-white md:space-y-3'>
                        <h1 className='text-3xl font-bold leading-tight md:text-5xl lg:text-6xl'>
                            <span className='inline-block'>
                                Your Pet&apos;s Entire Medical History.
                            </span>
                            <br />
                            <span className='inline-block text-cyan-300'>
                                In One Secure App.
                            </span>
                        </h1>
                        <p className='text-base text-gray-300 md:text-lg'>
                            Track vaccines, weight, medications, and daily care — without paper records or forgotten appointments.
                        </p>

                        {/* Download CTA */}
                        <div className='space-y-2'>
                            <p className='text-sm font-semibold tracking-wider text-cyan-300 uppercase'>Download Free — No Credit Card Required</p>
                            <AppDownloadButtons source='hero_section' imageClassName='h-14' priority />
                        </div>

                        {/* Social proof */}
                        <div className='flex items-center gap-3'>
                            <div className='flex -space-x-3'>
                                {[1, 2, 3, 4].map((num) => (
                                    <Image
                                        key={num}
                                        src={`/images/banavt${num}.png`}
                                        alt='Happy pet owner'
                                        width={44}
                                        height={44}
                                        className='h-10 w-10 rounded-full border-2 border-white object-cover md:h-11 md:w-11'
                                    />
                                ))}
                            </div>
                            <div className='text-sm text-gray-300'>
                                <span className='font-semibold text-white'>4.5 ★</span> 1,399 reviews • Free to start
                            </div>
                        </div>
                    </div>

                    {/* Right Column - App Screenshot Slideshow */}
                    <div className='relative z-10 block'>
                        <div className='relative mx-auto w-full max-w-xs md:max-w-none'>
                            <div className='animate-float'>
                                <div className='relative aspect-[9/19] w-full max-h-[400px] md:max-h-[min(56vh,560px)] [contain:layout]'>
                                    {slides.map((slide, index) => {
                                        // Only render current slide ± 1 neighbor to avoid loading all 10 images at once (LCP fix)
                                        const dist = Math.min(
                                            Math.abs(currentSlide - index),
                                            slides.length - Math.abs(currentSlide - index)
                                        );
                                        if (dist > 1 && index !== 0) return null;

                                        return (
                                            <Image
                                                key={slide.src}
                                                src={slide.src}
                                                alt={slide.alt}
                                                fill
                                                sizes={sliderSizes}
                                                quality={index === 0 ? 85 : 80}
                                                priority={index <= 1}
                                                loading={index <= 1 ? 'eager' : 'lazy'}
                                                fetchPriority={index === 0 ? 'high' : 'auto'}
                                                decoding={index === 0 ? 'sync' : 'async'}
                                                className={`absolute inset-0 z-10 object-contain transition-all duration-700 ${
                                                    currentSlide === index
                                                        ? 'opacity-100 scale-100'
                                                        : 'opacity-0 scale-95'
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div
                className='absolute right-0 bottom-0 left-0 h-16 bg-[#0C4C55]'
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
            />
        </section>
    );
}
