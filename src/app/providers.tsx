'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { getStoredConsent } from '@/lib/cookie-consent';

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/ingest',
        ui_host: 'https://eu.posthog.com',
        capture_exceptions: false,
        debug: false,
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true,
        enable_heatmaps: false,
        persistence: 'localStorage+cookie',
        opt_in_site_apps: false,
        disable_surveys: true,
    });
    const consent = getStoredConsent();
    if (!consent || !consent.analytics) {
        posthog.opt_out_capturing();
    }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return <PHProvider client={posthog}>{children}</PHProvider>;
}
