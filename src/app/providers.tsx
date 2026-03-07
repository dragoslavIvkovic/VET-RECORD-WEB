'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
                person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
                autocapture: false,
                capture_pageview: false,
                capture_pageleave: false,
                disable_session_recording: true,
                debug: false,
                session_recording: {
                    maskAllInputs: true,
                },
                persistence: 'localStorage+cookie'
            });
        }
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
