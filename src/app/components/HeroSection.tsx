'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = ['/images/bannerScreen.png', '/images/bannerScreen2.png', '/images/bannerScreen3.png'];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='relative bg-[#0C4C55] p-8 sm:p-12 md:p-16 lg:p-20'>
            <div className='container mx-auto'>
                <div className='grid gap-8 md:grid-cols-2 md:items-center'>
                    {/* Left Column - Text Content */}
                    <div className='z-10 space-y-6 text-white'>
                        <span className='inline-block text-lg font-semibold text-cyan-300'>Download</span>
                        <h1 className='text-4xl leading-tight font-bold md:text-5xl lg:text-6xl'>
                            Manage Your Pet's <br />
                            <span className='text-cyan-300'>Health with Vet Record</span>
                        </h1>
                        <p className='text-lg text-gray-300'>
                            Track your pet's vaccinations, medical treatments, and more – all in one place. Download the
                            Vet Record app today to ensure your pets receive the care they deserve!
                        </p>

                        <p className='text-md text-gray-200'>
                            Pridružite se hiljadama zadovoljnih korisnika i instalirajte našu aplikaciju sada!
                        </p>

                        {/* Pet Avatars */}
                        <div className='space-y-4'>
                            <div className='flex -space-x-4'>
                                {[1, 2, 3, 4].map((num) => (
                                    <img
                                        key={num}
                                        src={`/images/banavt${num}.png`}
                                        alt=''
                                        className='h-12 w-12 rounded-full border-2 border-white'
                                    />
                                ))}
                            </div>
                            <div>
                                <h2 className='text-xl font-bold'>TRY FOR FREE</h2>
                                <p className='text-gray-300'>Join thousands of happy pet owners worldwide</p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className='pt-4'>
                            <a
                                href='https://play.google.com/store/apps/details?id=vetrecord.app'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-block transform rounded-lg bg-white p-4 transition hover:scale-105'>
                                <img
                                    src='/images/googleplay_dark.png'
                                    alt='Get it on Google Play'
                                    className='h-14 w-auto'
                                />
                            </a>
                        </div>
                    </div>

                    {/* Right Column - App Screenshot */}
                    <div className='relative z-10 hidden md:block'>
                        <div className='relative mx-auto w-[320px]'>
                            {/* App Screenshots Slider */}
                            <div className='relative h-[630px]'>
                                <img
                                    src='/images/frameFirstScreen.png'
                                    alt='Phone Frame'
                                    className='absolute inset-0 z-20 h-full w-full object-contain'
                                />
                                {slides.map((slide, index) => (
                                    <img
                                        key={slide}
                                        src={slide || '/placeholder.svg'}
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
            <div
                className='absolute right-0 bottom-0 left-0 h-16 bg-[#0C4C55]'
                style={{
                    clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)'
                }}
            />
        </section>
    );
}
