'use client';

import { useEffect, useState } from 'react';
import { APP_LINKS } from '../config/links';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
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

    useEffect(() => {
        setIsLoaded(true);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

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
                    <div className={`z-10 space-y-2 md:space-y-3 text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h1 className='text-3xl leading-tight font-bold md:text-5xl lg:text-6xl'>
                            <span className={`inline-block transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                Your Pet&apos;s Entire Medical History.
                            </span>
                            <br />
                            <span className={`inline-block text-cyan-300 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                In One Secure App.
                            </span>
                        </h1>
                        <p className={`text-base text-gray-300 transition-all duration-700 delay-500 md:text-lg ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            Track vaccines, weight, medications, and daily care — without paper records or forgotten appointments.
                        </p>

                        {/* Download CTA */}
                        <div className={`space-y-2 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <p className='text-sm font-semibold uppercase tracking-wider text-cyan-300'>Download Free — No Credit Card Required</p>
                            <div className='flex items-center gap-4'>
                                <a
                                    href={APP_LINKS.GOOGLE_PLAY}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='transition hover:scale-105'
                                >
                                    <img src='/images/download/googleplay-dark.png' alt='Get it on Google Play' className='h-14' />
                                </a>
                                <a
                                    href={APP_LINKS.APP_STORE}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='transition hover:scale-105'
                                >
                                    <img src='/images/download/appstore-dark.png' alt='Download on the App Store' className='h-14' />
                                </a>
                            </div>
                        </div>

                        {/* Social proof */}
                        <div className={`flex items-center gap-3 transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <div className='flex -space-x-3'>
                                {[1, 2, 3, 4].map((num) => (
                                    <img
                                        key={num}
                                        src={`/images/banavt${num}.png`}
                                        alt='Happy pet owner'
                                        className='h-10 w-10 rounded-full border-2 border-white md:h-11 md:w-11'
                                    />
                                ))}
                            </div>
                            <div className='text-sm text-gray-300'>
                                <span className='font-semibold text-white'>4.5 ★</span> 1,399 reviews • Free to start
                            </div>
                        </div>
                    </div>

                    {/* Right Column - App Screenshot */}
                    <div className={`relative z-10 block transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className='relative mx-auto w-full max-w-xs md:max-w-none'>
                            <div className='animate-float'>
                                <div className='relative aspect-9/19 w-full max-h-[400px] md:max-h-200'>
                                    {slides.map((slide, index) => (
                                        <img
                                            key={slide.src}
                                            src={slide.src}
                                            alt={slide.alt}
                                            className={`absolute inset-0 z-10 h-full w-full object-contain transition-all duration-700 ${
                                                currentSlide === index 
                                                    ? 'opacity-100 scale-100' 
                                                    : 'opacity-0 scale-95'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Slider Dots */}
                            <div className='absolute -bottom-4 left-1/2 z-30 flex -translate-x-1/2 transform space-x-1.5 md:-bottom-8 md:space-x-2'>
                                {slides.map((_, index) => (
                                    <button
                                        type='button'
                                        key={`slide-${index + 1}`}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 md:h-2 ${
                                            currentSlide === index 
                                                ? 'bg-white w-5 md:w-6' 
                                                : 'bg-white/50 w-1.5 md:w-2 hover:bg-white/70'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div
                className='absolute right-0 bottom-0 left-0 h-16 bg-[#0C4C55]'
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)'
                }}
            />
        </section>
    );
}
