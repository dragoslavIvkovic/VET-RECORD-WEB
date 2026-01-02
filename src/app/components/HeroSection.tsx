'use client';

import { useEffect, useState } from 'react';
import { APP_LINKS } from '../constants/app-links';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/images/slider/slide-01.webp',
        '/images/slider/slide-02.webp',
        '/images/slider/slide-03.webp',
        '/images/slider/slide-04.webp',
        '/images/slider/slide-05.webp',
        '/images/slider/slide-06.webp',
        '/images/slider/slide-07.webp',
        '/images/slider/slide-08.webp',
        '/images/slider/slide-09.webp',
        '/images/slider/slide-10.webp'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='relative px-4 py-4 bg-[#0C4C55]'>
            <div className='container mx-auto px-4'>
                <div className='grid gap-4 md:grid-cols-2 md:items-center'>
                    {/* Left Column - Text Content */}
                    <div className='z-10 space-y-3 text-white'>
                        <h1 className='text-4xl leading-tight font-bold md:text-5xl lg:text-6xl'>
                            Manage Your Pet's <br />
                            <span className='text-cyan-300'>Health with Vet Record</span>
                        </h1>
                        <p className='text-lg text-gray-300'>
                            Track your pet's vaccinations, medical treatments, and more – all in one place. Download the
                            Vet Record app today to ensure your pets receive the care they deserve!
                        </p>

                        {/* Pet Avatars */}
                        <div className='space-y-2'>
                            <div className='flex -space-x-4'>
                                <img
                                    src='/images/banavt1.png'
                                    alt=''
                                    className='h-12 w-12 rounded-full border-2 border-white'
                                />
                                <img
                                    src='/images/banavt2.png'
                                    alt=''
                                    className='h-12 w-12 rounded-full border-2 border-white'
                                />
                                <img
                                    src='/images/banavt3.png'
                                    alt=''
                                    className='h-12 w-12 rounded-full border-2 border-white'
                                />
                                <img
                                    src='/images/banavt4.png'
                                    alt=''
                                    className='h-12 w-12 rounded-full border-2 border-white'
                                />
                            </div>
                            <div>
                                <h2 className='text-xl font-bold'>TRY FOR FREE</h2>
                                <p className='text-gray-300'>
                                    The best application to manage your pet's health worldwide
                                </p>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className='space-y-2'>
                            <span className='inline-block text-lg'>Download</span>
                            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-block transition hover:opacity-90'
                            >
                                <img 
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                    alt="Get it on Google Play"
                                    className="h-16 w-auto"
                                />
                            </a>

                            <a
                                href={APP_LINKS.APP_STORE}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-block transition hover:opacity-90'
                            >
                                <img 
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1502323200" 
                                    alt="Download on the App Store"
                                    className="h-12 w-auto"
                                />
                            </a>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - App Screenshot */}
                    <div className='relative z-10 block'>
                        <div className='relative mx-auto w-full'>
                            {/* App Screenshots Slider */}
                            <div className='relative aspect-9/19 w-full max-h-200'>
                                {slides.map((slide, index) => (
                                    <img
                                        key={slide}
                                        src={slide}
                                        alt={`App Screenshot ${index + 1}`}
                                        className={`absolute inset-0 z-10 h-full w-full object-contain transition-opacity duration-500 ${
                                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                ))}
                            </div>
                            {/* Slider Dots */}
                            <div className='absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2'>
                                {slides.map((_, index) => (
                                    <button
                                        type='button'
                                        key={`slide-${index + 1}`}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2 w-2 rounded-full transition-colors ${
                                            currentSlide === index ? 'bg-white' : 'bg-white/50'
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

            {/* Укошена линија на дну */}
            <div
                className='absolute right-0 bottom-0 left-0 h-16 bg-[#0C4C55]'
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)'
                }}
            />
        </section>
    );
}
