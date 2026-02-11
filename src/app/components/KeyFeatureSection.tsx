'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@/i18n/translations-context';

export default function KeyFeatureSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const t = useTranslations();

    const features = [
        {
            icon: '☁️',
            titleKey: 'features.cloud.title',
            descKey: 'features.cloud.description',
            image: '/images/keyftr1.png',
            altKey: 'features.cloud.alt',
        },
        {
            icon: '🩺',
            titleKey: 'features.health.title',
            descKey: 'features.health.description',
            image: '/images/keyftr2.png',
            altKey: 'features.health.alt',
        },
        {
            icon: '📅',
            titleKey: 'features.reminders.title',
            descKey: 'features.reminders.description',
            image: '/images/keyftr3.png',
            altKey: 'features.reminders.alt',
        },
        {
            icon: '🤝',
            titleKey: 'features.sharing.title',
            descKey: 'features.sharing.description',
            image: '/images/keyftr4.png',
            altKey: 'features.sharing.alt',
        },
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
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white">
                        {t('features.badge')}
                    </span>
                    <h2 className="mt-4 text-4xl font-bold">
                        {t('features.title')}{' '}
                        <span className="text-[#FF5733]">{t('features.titleHighlight')}</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl">
                        <strong>{t('features.intro')}</strong>
                    </p>
                    <p className="mx-auto mt-2 max-w-3xl text-gray-600">{t('features.introDesc')}</p>
                </div>

                <div className="relative">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {features.map((feature, index) => (
                                <div key={index} className="w-full shrink-0 px-4">
                                    <div className="rounded-2xl bg-[#F5F5F5] p-8 text-center">
                                        <h3 className="mb-4 text-2xl font-bold text-[#0C4C55]">
                                            {feature.icon} {t(feature.titleKey)}
                                        </h3>
                                        <p className="mb-8 text-gray-600">
                                            {t(feature.descKey)}
                                        </p>
                                        <div className="mx-auto max-w-xs">
                                            <img
                                                src={feature.image}
                                                alt={t(feature.altKey)}
                                                className="h-auto w-full"
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
