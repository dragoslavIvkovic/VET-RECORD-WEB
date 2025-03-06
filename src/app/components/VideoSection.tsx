'use client';

import { useState } from 'react';

export default function VideoSection() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className='bg-surface py-20'>
            <div className='container mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
                {/* Section Header */}
                <div className='mb-12 text-center'>
                    <span className='bg-primary inline-block rounded-full px-4 py-1 text-sm font-medium text-white'>
                        Watch Demo
                    </span>
                    <h2 className='font-display text-text-primary mt-4 text-4xl font-bold'>
                        See How <span className='text-secondary'>Vet Record</span> Works
                    </h2>
                </div>

                {/* Video Container */}
                <div className='mx-auto max-w-4xl'>
                    <div className='relative overflow-hidden rounded-2xl bg-gray-100 pt-[56.25%] shadow-lg'>
                        {isLoading && (
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent' />
                            </div>
                        )}
                        <iframe
                            className='absolute inset-0 h-full w-full'
                            src='https://www.youtube.com/embed/25mGPVeiH-w'
                            title='Vet Record App Demo'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                            onLoad={() => setIsLoading(false)}
                            loading='lazy'
                        />
                    </div>
                    <p className='text-text-secondary mt-4 text-center text-sm'>
                        Watch our demo to see how Vet Record can help you manage your pet's health records effectively
                    </p>
                </div>
            </div>
        </section>
    );
}
