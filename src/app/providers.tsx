'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

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
        session_recording: {
            maskAllInputs: true,
        },
        persistence: 'localStorage+cookie',
    });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return <PHProvider client={posthog}>{children}</PHProvider>;
}
