'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ScrollToTop = dynamic(() => import('./ScrollToTop'), { ssr: false });
const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup'), { ssr: false });
const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then((m) => m.SpeedInsights), {
    ssr: false
});

/**
 * Mounts non-critical UI after idle to reduce main-thread work during TBT window
 * (scroll button, exit popup, Speed Insights).
 */
export default function DeferredNonCriticalUI() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let idleId: ReturnType<typeof requestIdleCallback> | undefined;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(() => setShow(true), { timeout: 2500 });
        } else {
            timeoutId = setTimeout(() => setShow(true), 200);
        }

        return () => {
            if (idleId !== undefined && typeof window !== 'undefined') {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId !== undefined) clearTimeout(timeoutId);
        };
    }, []);

    if (!show) return null;

    return (
        <>
            <ScrollToTop />
            <ExitIntentPopup />
            <SpeedInsights />
        </>
    );
}
