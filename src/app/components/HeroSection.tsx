'use client';

import { useEffect, useState } from 'react';
import { APP_LINKS } from '../config/links';
import { useTranslations } from '@/i18n/translations-context';

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const t = useTranslations();

    const slideKeys = [
        'slides.alt1',
        'slides.alt2',
        'slides.alt3',
        'slides.alt4',
        'slides.alt5',
        'slides.alt6',
        'slides.alt7',
        'slides.alt8',
        'slides.alt9',
        'slides.alt10',
    ];

    const slides = slideKeys.map((key, i) => ({
        src: `/images/slider/slide-${String(i + 1).padStart(2, '0')}.webp`,
        alt: t(key),
    }));

    useEffect(() => {
        setIsLoaded(true);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 10);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#0C4C55] px-4 py-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-teal-400/10 blur-3xl delay-1000" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="grid gap-4 md:grid-cols-2 md:items-center">
                    <div
                        className={`z-10 space-y-3 text-white transition-all duration-1000 ${
                            isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                        }`}
                    >
                        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                            <span
                                className={`inline-block transition-all duration-700 delay-100 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                }`}
                            >
                                {t('hero.title1')}
                            </span>
                            <br />
                            <span
                                className={`inline-block text-cyan-300 transition-all duration-700 delay-300 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                }`}
                            >
                                {t('hero.title2')}
                            </span>
                        </h1>
                        <p
                            className={`text-lg text-gray-300 transition-all duration-700 delay-500 ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                            }`}
                        >
                            {t('hero.subtitle')}
                        </p>

                        <div
                            className={`space-y-2 transition-all duration-700 delay-700 ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                            }`}
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((num, idx) => (
                                    <img
                                        key={num}
                                        src={`/images/banavt${num}.png`}
                                        alt={t('common.altUser')}
                                        className="h-12 w-12 rounded-full border-2 border-white transition-all duration-500 hover:z-10 hover:scale-110"
                                        style={{ transitionDelay: `${800 + idx * 100}ms` }}
                                    />
                                ))}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{t('hero.tryFree')}</h2>
                                <p className="text-gray-300">{t('hero.tryFreeDesc')}</p>
                            </div>
                        </div>

                        <div
                            className={`space-y-2 transition-all duration-700 delay-1000 ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                            }`}
                        >
                            <span className="inline-block text-lg">{t('hero.download')}</span>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <a
                                    href={APP_LINKS.GOOGLE_PLAY}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block transition-all duration-300 hover:scale-105 hover:opacity-90"
                                >
                                    <img
                                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                        alt={t('common.altAndroid')}
                                        className="h-[70px] w-auto"
                                    />
                                </a>

                                <a
                                    href={APP_LINKS.APP_STORE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block transition-all duration-300 hover:scale-105 hover:opacity-90"
                                >
                                    <img
                                        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1502323200"
                                        alt={t('common.altiOS')}
                                        className="h-12 w-auto"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`relative z-10 block transition-all duration-1000 delay-300 ${
                            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        }`}
                    >
                        <div className="relative mx-auto w-full">
                            <div className="animate-float">
                                <div className="relative aspect-9/19 max-h-200 w-full">
                                    {slides.map((slide, index) => (
                                        <img
                                            key={slide.src}
                                            src={slide.src}
                                            alt={slide.alt}
                                            className={`absolute inset-0 z-10 h-full w-full object-contain transition-all duration-700 ${
                                                currentSlide === index
                                                    ? 'scale-100 opacity-100'
                                                    : 'scale-95 opacity-0'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        type="button"
                                        key={`slide-${index + 1}`}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            currentSlide === index
                                                ? 'w-6 bg-white'
                                                : 'w-2 bg-white/50 hover:bg-white/70'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-16 bg-[#0C4C55]"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
                }}
            />
        </section>
    );
}
