'use client';

import { useEffect, useState } from 'react';

interface Feature {
    icon: string;
    title: string;
    description: string;
    image: string;
}

export default function KeyFeatureSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const features: Feature[] = [
        {
            icon: '☁️',
            title: 'Cloud-Based Convenience',
            description:
                "Access your pet's information anytime, anywhere, on any device. Stay connected 24/7 with our cloud-based system.",
            image: '/images/keyftr1.png'
        },
        {
            icon: '🩺',
            title: 'Comprehensive Health Tracking',
            description:
                "Maintain detailed records of your pet's health: vaccinations, medications, surgeries, and more. Never miss a crucial health milestone again!",
            image: '/images/keyftr2.png'
        },
        {
            icon: '📅',
            title: 'Intelligent Reminders',
            description:
                "Get notified about vet appointments, medication schedules, and vaccination dates. We'll even remind you about your pet's birthday!",
            image: '/images/keyftr3.png'
        },
        {
            icon: '🤝',
            title: 'Effortless Data Sharing',
            description:
                "Share your pet's medical information easily with family, friends, or a new vet. Keep everyone informed for the best care.",
            image: '/images/keyftr4.png'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % features.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
    };

    return (
        <section className='py-20'>
            <div className='container mx-auto px-4'>
                {/* Section Header */}
                <div className='mb-12 text-center'>
                    <span className='rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white'>Key Feature</span>
                    <h2 className='mt-4 text-4xl font-bold'>
                        Powerful <span className='text-[#FF5733]'>features</span>
                    </h2>
                    <p className='mx-auto mt-4 max-w-2xl'>
                        <strong>Introducing Vet Record: Your All-In-One Pet Health Management App!</strong>
                    </p>
                    <p className='mx-auto mt-2 max-w-3xl text-gray-600'>
                        Are you a dedicated pet owner looking for a smarter way to keep your furry friends healthy and
                        happy? Meet Vet Record - the ultimate pet health management app designed to simplify your life
                        and ensure your pets always receive the best care possible.
                    </p>
                </div>

                {/* Slider Section */}
                <div className='relative'>
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className='absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg'>
                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className='absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg'>
                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </button>

                    {/* Slides Container */}
                    <div className='overflow-hidden'>
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {features.map((feature, index) => (
                                <div key={index} className='w-full flex-shrink-0 px-4'>
                                    <div className='rounded-2xl bg-[#F5F5F5] p-8 text-center'>
                                        <h3 className='mb-4 text-2xl font-bold text-[#0C4C55]'>
                                            {feature.icon} {feature.title}
                                        </h3>
                                        <p className='mb-8 text-gray-600'>{feature.description}</p>
                                        <div className='mx-auto max-w-xs'>
                                            <img src={feature.image} alt={feature.title} className='h-auto w-full' />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
