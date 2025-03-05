'use client';

import { useEffect, useState } from 'react';

interface Feature {
    icon: string;
    title: string;
    description: string;
    image: string;
    id: string;
}

export default function KeyFeatureSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const features: Feature[] = [
        {
            id: 'cloud-feature',
            icon: '☁️',
            title: 'Cloud-Based Convenience',
            description:
                "Access your pet's information anytime, anywhere, on any device. Stay connected 24/7 with our cloud-based system.",
            image: '/images/keyftr1.png'
        },
        {
            id: 'health-feature',
            icon: '🩺',
            title: 'Comprehensive Health Tracking',
            description:
                "Maintain detailed records of your pet's health: vaccinations, medications, surgeries, and more. Never miss a crucial health milestone again!",
            image: '/images/keyftr2.png'
        },
        {
            id: 'reminder-feature',
            icon: '📅',
            title: 'Intelligent Reminders',
            description:
                "Get notified about vet appointments, medication schedules, and vaccination dates. We'll even remind you about your pet's birthday!",
            image: '/images/keyftr3.png'
        },
        {
            id: 'sharing-feature',
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
        <section className='relative overflow-hidden py-20'>
            <div className='container mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='mb-12 text-center'>
                    <span className='bg-primary inline-block rounded-full px-4 py-1 text-sm font-medium text-white'>
                        Key Features
                    </span>
                    <h2 className='font-bebas text-text-primary mt-4 text-4xl font-bold'>
                        See How <span className='text-secondary'>Vet Record</span> Works
                    </h2>
                    <p className='text-text-primary mx-auto mt-4 max-w-2xl font-medium'>
                        <strong>Introducing Vet Record: Your All-In-One Pet Health Management App!</strong>
                    </p>
                    <p className='text-text-secondary mx-auto mt-2 max-w-3xl'>
                        Are you a dedicated pet owner looking for a smarter way to keep your furry friends healthy and
                        happy? Meet Vet Record - the ultimate pet health management app designed to simplify your life
                        and ensure your pets always receive the best care possible.
                    </p>
                </div>

                {/* Slider Section */}
                <div className='relative mx-auto max-w-5xl'>
                    {/* Navigation Buttons */}
                    <button
                        type='button'
                        onClick={prevSlide}
                        className='focus:ring-primary absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none'
                        aria-label='Previous slide'>
                        <svg className='text-primary h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <title>Previous Slide Arrow</title>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={nextSlide}
                        className='focus:ring-primary absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none'
                        aria-label='Next slide'>
                        <svg className='text-primary h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <title>Next Slide Arrow</title>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </button>

                    {/* Slides Container */}
                    <div className='overflow-hidden rounded-2xl'>
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {features.map((feature) => (
                                <div key={feature.id} className='w-full flex-shrink-0 px-4'>
                                    <div className='group bg-surface rounded-2xl p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl'>
                                        <div className='bg-primary/10 mb-6 inline-block rounded-full p-3 text-4xl'>
                                            {feature.icon}
                                        </div>
                                        <h3 className='font-bebas text-primary mb-4 text-2xl font-bold'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-text-secondary mb-8'>{feature.description}</p>
                                        <div className='relative mx-auto max-w-xs overflow-hidden rounded-lg'>
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className='h-auto w-full transform transition-transform duration-300 group-hover:scale-105'
                                            />
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
