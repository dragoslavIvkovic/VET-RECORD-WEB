'use client';

import { useTranslations } from '@/i18n/translations-context';

export function AboutContent() {
    const t = useTranslations();

    const stats = [
        { number: '150+', labelKey: 'about.stats.countries' },
        { number: '2300+', labelKey: 'about.stats.reviews' },
        { number: '8M+', labelKey: 'about.stats.followers' },
    ];

    const features = [
        { titleKey: 'about.why1.title', descKey: 'about.why1.description' },
        { titleKey: 'about.why2.title', descKey: 'about.why2.description' },
        { titleKey: 'about.why3.title', descKey: 'about.why3.description' },
    ];

    return (
        <main className="flex min-h-screen flex-col items-center">
            <section className="w-full bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-16">
                <div className="container mx-auto px-4 text-center">
                    <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm">
                        {t('about.badge')}
                    </span>
                    <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                        {t('about.title')} <br />
                        <span className="text-cyan-300">{t('about.titleHighlight')}</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">{t('about.intro')}</p>
                </div>
            </section>

            <section className="w-full bg-[#F3F5FF] py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:scale-105"
                            >
                                <p className="mb-2 text-3xl font-bold text-[#0C4C55]">
                                    {stat.number}
                                </p>
                                <p className="text-gray-600">{t(stat.labelKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold text-[#0C4C55]">
                        {t('about.whyTitle')}
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105"
                            >
                                <h3 className="mb-4 text-xl font-semibold text-[#0C4C55]">
                                    {t(feature.titleKey)}
                                </h3>
                                <p className="text-gray-600">{t(feature.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-linear-to-t from-[#0C4C55] to-[#0a3d44] py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-3xl font-bold text-white">{t('about.ctaTitle')}</h2>
                    <p className="mb-8 text-gray-300">{t('about.ctaDesc')}</p>
                    <a
                        href="https://play.google.com/store/apps/details?id=vetrecord.app"
                        className="rounded-full bg-white px-8 py-3 font-semibold text-[#0C4C55] transition-colors hover:bg-gray-100"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('about.ctaButton')}
                    </a>
                </div>
            </section>
        </main>
    );
}
