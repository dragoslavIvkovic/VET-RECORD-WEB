'use client';

import { useTranslations } from '@/i18n/translations-context';

interface Review {
    name: string;
    avatar: string;
    text: string;
    id: string;
}

export default function ReviewSection() {
    const t = useTranslations();

    const reviews: Review[] = [
        {
            id: 'review1',
            name: 'Aimin',
            avatar: '/images/review1.png',
            text:
                "This app has made managing my pet's care so much simpler. Thank you!",
        },
        {
            id: 'review2',
            name: 'Ferwelo, Nikko D',
            avatar: '/images/review2.png',
            text: 'My pet will like this',
        },
        {
            id: 'review3',
            name: 'Anonymous',
            avatar: '/images/review3.png',
            text: 'Simple, effective and working. Nice 👍',
        },
    ];

    const StarIcon = () => (
        <svg
            className="h-4 w-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );

    return (
        <section id="reviews" className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="mb-4 inline-block rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white">
                        {t('reviews.badge')}
                    </span>
                    <h2 className="text-3xl font-bold md:text-4xl">
                        {t('reviews.title')}{' '}
                        <span className="text-[#0C4C55]">{t('reviews.titleHighlight')}</span>
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={`rating-${i}`} />
                            ))}
                        </div>
                        <span className="font-semibold">{t('reviews.rating')}</span>
                        <span className="text-gray-500">{t('reviews.count')}</span>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-xl"
                        >
                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={`${review.id}-star-${i}`} />
                                ))}
                            </div>

                            <p className="mb-6 leading-relaxed text-gray-700">"{review.text}"</p>

                            <div className="flex items-center gap-3">
                                <img
                                    src={review.avatar}
                                    alt={`${review.name} - Vet Record App User Review`}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <span className="font-semibold text-gray-900">{review.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="https://play.google.com/store/apps/details?id=vetrecord.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#0C4C55] px-6 py-3 text-white transition hover:bg-[#0a3d44]"
                    >
                        {t('reviews.cta')}
                        <svg
                            className="h-4 w-4"
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
                    </a>
                </div>
            </div>
        </section>
    );
}
