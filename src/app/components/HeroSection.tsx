'use client';

import { useEffect, useState } from 'react';
import { APP_LINKS } from '../config/links';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
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
        setIsLoaded(true);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='relative px-4 py-4 bg-[#0C4C55] overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse' />
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000' />
            </div>

            <div className='container mx-auto px-4 relative z-10'>
                <div className='grid gap-4 md:grid-cols-2 md:items-center'>
                    {/* Left Column - Text Content */}
                    <div className={`z-10 space-y-3 text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h1 className='text-4xl leading-tight font-bold md:text-5xl lg:text-6xl'>
                            <span className={`inline-block transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                Manage Your Pet's
                            </span>
                            <br />
                            <span className={`inline-block text-cyan-300 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                                Health with Vet Record
                            </span>
                        </h1>
                        <p className={`text-lg text-gray-300 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            Track your pet's vaccinations, medical treatments, and more – all in one place. Download the
                            Vet Record app today to ensure your pets receive the care they deserve!
                        </p>

                        {/* Pet Avatars */}
                        <div className={`space-y-2 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <div className='flex -space-x-4'>
                                {[1, 2, 3, 4].map((num, idx) => (
                                    <img
                                        key={num}
                                        src={`/images/banavt${num}.png`}
                                        alt=''
                                        className={`h-12 w-12 rounded-full border-2 border-white transition-all duration-500 hover:scale-110 hover:z-10`}
                                        style={{ transitionDelay: `${800 + idx * 100}ms` }}
                                    />
                                ))}
                            </div>
                            <div>
                                <h2 className='text-xl font-bold'>TRY FOR FREE</h2>
                                <p className='text-gray-300'>
                                    The best application to manage your pet's health worldwide
                                </p>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className={`space-y-2 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                            <span className='inline-block text-lg'>Download</span>
                            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                                <a
                                    href={APP_LINKS.GOOGLE_PLAY}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-block transition-all duration-300 hover:scale-105 hover:opacity-90'
                                >
                                    <img 
                                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                        alt="Get it on Google Play"
                                        className="h-[70px] w-auto"
                                    />
                                </a>

                                <a
                                    href={APP_LINKS.APP_STORE}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-block transition-all duration-300 hover:scale-105 hover:opacity-90'
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
                    <div className={`relative z-10 block transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className='relative mx-auto w-full'>
                            {/* Floating phone effect */}
                            <div className='animate-float'>
                                {/* App Screenshots Slider */}
                                <div className='relative aspect-9/19 w-full max-h-200'>
                                    {slides.map((slide, index) => (
                                        <img
                                            key={slide}
                                            src={slide}
                                            alt={`App Screenshot ${index + 1}`}
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
                            <div className='absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2'>
                                {slides.map((_, index) => (
                                    <button
                                        type='button'
                                        key={`slide-${index + 1}`}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            currentSlide === index 
                                                ? 'bg-white w-6' 
                                                : 'bg-white/50 w-2 hover:bg-white/70'
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
