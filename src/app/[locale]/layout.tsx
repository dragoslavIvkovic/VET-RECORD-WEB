import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import '@/app/globals.css';

import { locales, defaultLocale, localeToHreflang } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/get-messages';
import { I18nProvider } from '@/i18n/translations-context';

import NavigationBar from '../components/NavigationBar';
import ScrollToTop from '../components/ScrollToTop';

const SITE_URL = 'https://www.vetrecord.app';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages(locale as Locale);
    const t = createT(messages);

    const title = t('meta.title');
    const description = t('meta.description');
    const hreflang = localeToHreflang[locale as Locale];
    const canonicalPath = `/${locale}`;

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: title,
            template: `%s | Vet Record`,
        },
        description,
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/${locale}`,
            siteName: 'Vet Record',
            images: [
                {
                    url: `${SITE_URL}/images/slider/slide-01.webp`,
                    width: 800,
                    height: 600,
                },
            ],
            locale: hreflang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${SITE_URL}/images/slider/slide-01.webp`],
        },
        alternates: {
            canonical: `${SITE_URL}${canonicalPath}`,
            languages: {
                'sr-Latn': `${SITE_URL}/sr`,
                en: `${SITE_URL}/en`,
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    };
}

function createT(messages: Record<string, unknown>) {
    return (key: string): string => {
        const keys = key.split('.');
        let current: unknown = messages;
        for (const k of keys) {
            current = (current as Record<string, unknown>)?.[k];
        }
        return (typeof current === 'string' ? current : key) as string;
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
        return null;
    }

    const messages = await getMessages(locale as Locale);

    const structuredDescription =
        locale === 'sr'
            ? 'Sveobuhvatna aplikacija za praćenje zdravlja ljubimaca za pse i mačke'
            : 'Comprehensive pet health tracking app for dogs and cats';

    return (
        <I18nProvider locale={locale as Locale} messages={messages}>
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Vet Record',
                        description: structuredDescription,
                        applicationCategory: 'HealthApplication',
                        operatingSystem: 'Android',
                        aggregateRating: {
                            '@type': 'AggregateRating',
                            ratingValue: '4.5',
                            reviewCount: '1399',
                        },
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        url: SITE_URL,
                        image: `${SITE_URL}/images/slider/slide-01.webp`,
                        publisher: {
                            '@type': 'Organization',
                            name: 'VetRecord',
                            logo: {
                                '@type': 'ImageObject',
                                url: `${SITE_URL}/logo.svg`,
                            },
                        },
                    }),
                }}
            />
            <div className={`min-h-screen bg-[#F3F5FF] ${poppins.className}`}>
                <NavigationBar />
                <div className="pt-16">{children}</div>
                <ScrollToTop />
                <Analytics />
            </div>
        </I18nProvider>
    );
}
