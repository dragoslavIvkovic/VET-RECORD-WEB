'use client';

import Script from 'next/script';
import { useEffect, useMemo, useState } from 'react';

import { getStoredConsent } from '@/lib/cookie-consent';

const GA_ID = 'G-9PGSFLM2FM';
const AW_ID = 'AW-940388544';

type ConsentFlags = { analytics: boolean; marketing: boolean };

function readConsent(): ConsentFlags | null {
    const c = getStoredConsent();
    if (!c) return null;

    return { analytics: c.analytics, marketing: c.marketing };
}

/**
 * Loads gtag only after cookie consent (analytics and/or marketing).
 * Avoids ~300KB+ of Google Tag Manager JS on first paint for users without consent
 * or before they accept — improves Lighthouse "unused JavaScript" and GDPR alignment.
 */
export default function ConsentAwareGtag() {
    const [consent, setConsent] = useState<ConsentFlags | null>(null);

    useEffect(() => {
        setConsent(readConsent());

        const onConsent = (e: Event) => {
            const detail = (e as CustomEvent<ConsentFlags>).detail;
            if (detail) {
                setConsent({ analytics: detail.analytics, marketing: detail.marketing });
            } else {
                setConsent(readConsent());
            }
        };

        window.addEventListener('cookie-consent-updated', onConsent);

        return () => window.removeEventListener('cookie-consent-updated', onConsent);
    }, []);

    const shouldLoad = consent && (consent.analytics || consent.marketing);

    const primaryScriptId = useMemo(() => {
        if (!consent) return GA_ID;
        if (consent.analytics) return GA_ID;
        if (consent.marketing) return AW_ID;

        return GA_ID;
    }, [consent]);

    useEffect(() => {
        if (!shouldLoad || typeof document === 'undefined') return;
        const href = 'https://www.googletagmanager.com';
        if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        document.head.appendChild(link);
    }, [shouldLoad]);

    if (!shouldLoad || !consent) {
        return null;
    }

    const inline =
        `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        ` +
        (consent.analytics
            ? `gtag('config', '${GA_ID}', { send_page_view: false, transport_type: 'beacon' });`
            : '') +
        (consent.marketing ? `gtag('config', '${AW_ID}');` : '');

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${primaryScriptId}`}
                strategy='lazyOnload'
            />
            <Script id='google-analytics-gtag' strategy='lazyOnload'>
                {inline}
            </Script>
        </>
    );
}
