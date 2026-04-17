import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/app/globals.css';

import { SITE_CONFIG } from '@/app/config/site';

import CookieConsent from './components/CookieConsent';
import NavigationBar from './components/NavigationBar';
import SmartAppBanner from './components/SmartAppBanner';
import ExitIntentPopup from './components/ExitIntentPopup';
import ScrollToTop from './components/ScrollToTop';
import { PostHogProvider } from './providers';

const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

const site = SITE_CONFIG.url;

export const metadata: Metadata = {
    metadataBase: new URL(site),
    title: {
        default: 'Vet Record | The #1 Pet Medical Records App',
        template: '%s | Vet Record'
    },
    description:
        "Simplify your pet's healthcare with Vet Record. The easiest pet medical record app to safely store, track, and manage vet records for your dogs and cats.",
    openGraph: {
        title: 'Vet Record | The #1 Pet Medical Records App',
        description:
            "Simplify your pet's healthcare with Vet Record. The easiest pet medical record app to safely store, track, and manage vet records for your dogs and cats.",
        url: site,
        siteName: 'Vet Record',
        images: [
            {
                url: `${site}${SITE_CONFIG.ogImage}`,
                width: 800,
                height: 600
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vet Record | The #1 Pet Medical Records App',
        description:
            "Simplify your pet's healthcare with Vet Record. The easiest pet medical record app to safely store, track, and manage vet records for your dogs and cats.",
        images: [`${site}${SITE_CONFIG.ogImage}`]
    },
    alternates: {
        canonical: site
    },
    keywords: [
        'pet health app',
        'pet medical records',
        'vaccination tracker',
        'medication reminders',
        'dog health',
        'cat health',
        'pet health organizer',
        'vet record'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true
        }
    }
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://eu.posthog.com" />
                <meta name="p:domain_verify" content="157b1f4deed124fa6508549e0e363960"/>
                <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=G-9PGSFLM2FM`} />
                <Script id='google-analytics' strategy='lazyOnload'>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-9PGSFLM2FM', {
                            send_page_view: false,
                            transport_type: 'beacon',
                        });
                        gtag('config', 'AW-940388544');
                    `}
                </Script>
                <Script
                    id='structured-data'
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'Vet Record',
                            description: 'Simplify your pet parenting journey. Track vaccines, medication reminders, and medical history for dogs and cats. Cloud sync for families.',
                            applicationCategory: 'HealthApplication',
                            operatingSystem: 'Android, iOS',
                            aggregateRating: {
                                '@type': 'AggregateRating',
                                ratingValue: '4.5',
                                reviewCount: '1399'
                            },
                            offers: {
                                '@type': 'Offer',
                                price: '0',
                                priceCurrency: 'USD'
                            },
                            url: site,
                            image: `${site}${SITE_CONFIG.ogImage}`,
                            publisher: {
                                '@type': 'Organization',
                                name: 'Vet Record',
                                url: site,
                                logo: {
                                    '@type': 'ImageObject',
                                    url: `${site}${SITE_CONFIG.logo}`
                                },
                                sameAs: [
                                    'https://www.instagram.com/vetrecordapp',
                                    'https://www.facebook.com/vetrecordapp'
                                ]
                            }
                        })
                    }}
                />
            </head>
            <body className={`min-h-screen bg-[#F3F5FF] ${poppins.className}`}>
                <PostHogProvider>
                    <header>
                        <NavigationBar />
                    </header>
                    <div className='pt-16 lg:pt-[72px]'>{children}</div>
                    <ScrollToTop />
                    <SmartAppBanner />
                    <ExitIntentPopup />
                    <CookieConsent />
                    <Analytics />
                    <SpeedInsights />
                </PostHogProvider>
            </body>
        </html>
    );
}
