import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Lora, Roboto_Condensed } from 'next/font/google';
import Script from 'next/script';

import '@/app/globals.css';

import NavigationBar from './components/NavigationBar';
import ScrollToTop from './components/ScrollToTop';

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-condensed',
    weight: ['300', '400', '700']
});

const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lora',
    weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: 'Vet Record - Pet Health Tracking App for Dogs & Cats',
    description:
        "Track your pet's health effortlessly! Monitor diet, exercise, medications, and vet visits with our comprehensive pet health app.",
    metadataBase: new URL('https://vetrecord.app'),
    openGraph: {
        title: 'Vet Record - Pet Health Tracking App',
        description:
            "Track your pet's health effortlessly! Monitor diet, exercise, medications, and vet visits with our comprehensive pet health app.",
        url: 'https://vetrecord.app',
        siteName: 'Vet Record',
        images: [
            {
                url: 'https://vetrecord.app/public/images/appscreen.png',
                width: 800,
                height: 600
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vet Record - Pet Health Tracking App',
        description:
            "Track your pet's health effortlessly! Monitor diet, exercise, medications, and vet visits with our comprehensive pet health app.",
        images: ['https://vetrecord.app/public/images/appscreen.png']
    },
    alternates: {
        canonical: 'https://vetrecord.app'
    },
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
                <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-9PGSFLM2FM' />
                <Script id='google-analytics' strategy='afterInteractive'>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-9PGSFLM2FM', {
                            send_page_view: false,
                            transport_type: 'beacon',
                        });
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
                            description: 'Comprehensive pet health tracking app for dogs and cats',
                            applicationCategory: 'HealthApplication',
                            operatingSystem: 'Android',
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
                            url: 'https://vetrecord.app',
                            image: 'https://vetrecord.app/public/images/appscreen.png',
                            publisher: {
                                '@type': 'Organization',
                                name: 'VetRecord',
                                logo: {
                                    '@type': 'ImageObject',
                                    url: 'https://vetrecord.app/public/images/logo.svg'
                                }
                            }
                        })
                    }}
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Lora:wght@400;500;600;700&display=swap'
                    rel='stylesheet'
                />
            </head>
            <body
                className={`${robotoCondensed.variable} ${lora.variable} bg-surface text-primary min-h-screen font-sans`}
                suppressHydrationWarning>
                <NavigationBar />
                <div className='pt-16'>{children}</div>
                <ScrollToTop />
            </body>
        </html>
    );
}
