import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { locales, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export default async function RootLayout({ children }: { children: ReactNode }) {
    const lang = await getLocaleFromCookies();
    return (
        <html lang={lang === 'sr' ? 'sr-Latn' : lang}>
            <head>
                <meta name="p:domain_verify" content="157b1f4deed124fa6508549e0e363960" />
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-9PGSFLM2FM"
                />
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=AW-940388544"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
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
            </head>
            <body>{children}</body>
        </html>
    );
}

async function getLocaleFromCookies(): Promise<string> {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value;
    return locale && locales.includes(locale as Locale) ? locale : defaultLocale;
}
