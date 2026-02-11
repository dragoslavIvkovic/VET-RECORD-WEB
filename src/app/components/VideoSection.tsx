'use client';

import { useTranslations } from '@/i18n/translations-context';

export default function VideoSection() {
    const t = useTranslations();

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white">
                        {t('video.badge')}
                    </span>
                    <h2 className="mt-4 text-4xl font-bold">
                        {t('video.title')}{' '}
                        <span className="text-[#FF5733]">{t('video.titleHighlight')}</span>{' '}
                        {t('video.titleSuffix')}
                    </h2>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="relative overflow-hidden rounded-2xl pt-[56.25%]">
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src="https://www.youtube.com/embed/25mGPVeiH-w"
                            title="Vet Record App Demo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
