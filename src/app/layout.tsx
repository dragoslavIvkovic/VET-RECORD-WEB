import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import '@/app/globals.css';

import NavigationBar from './components/NavigationBar';
import ScrollToTop from './components/ScrollToTop';

const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.vetrecord.app'),
    title: {
        default: 'Vet Record – Pet Health Tracking App for Dogs & Cats',
        template: '%s | Vet Record'
    },
    description:
        "Track vaccinations, medications, vet visits, and health history for your dog or cat. Cloud sync, reminders, and easy sharing.",
    openGraph: {
        title: 'Vet Record – Pet Health Tracking App for Dogs & Cats',
        description:
            "Track vaccines, meds, vet visits, and health records for your pets. Download on iOS & Android.",
        url: 'https://www.vetrecord.app',
        siteName: 'Vet Record',
        images: [
            {
                url: 'https://www.vetrecord.app/images/slider/slide-01.webp',
                width: 800,
                height: 600
            }
        ],
        locale: 'en_US',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vet Record – Pet Health Tracking App',
        description:
            "Track your pet's health effortlessly! Monitor diet, exercise, medications, and vet visits with our comprehensive pet health app.",
        images: ['https://www.vetrecord.app/images/slider/slide-01.webp']
    },
    alternates: {
        canonical: 'https://www.vetrecord.app'
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
                <meta name="p:domain_verify" content="157b1f4deed124fa6508549e0e363960"/>
                <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=G-9PGSFLM2FM`} />
                <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-940388544" strategy='afterInteractive' />
                <Script id='google-analytics' strategy='afterInteractive'>
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
                            url: 'https://www.vetrecord.app',
                            image: 'https://www.vetrecord.app/images/slider/slide-01.webp',
                            publisher: {
                                '@type': 'Organization',
                                name: 'VetRecord',
                                logo: {
                                    '@type': 'ImageObject',
                                    url: 'https://www.vetrecord.app/logo.svg'
                                }
                            }
                        })
                    }}
                />
            </head>
            <body className={`min-h-screen bg-[#F3F5FF] ${poppins.className}`}>
                <NavigationBar />
                <div className='pt-16'>{children}</div>
                <ScrollToTop />
                <Analytics />
            </body>
        </html>
    );
}
