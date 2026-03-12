'use client';

import Link from 'next/link';
import posthog from 'posthog-js';

import AppDownloadButtons from './AppDownloadButtons';
import { useEffect, useState } from 'react';
import {
    getStoredConsent,
    saveConsent,
    hasValidConsent,
    type CookieConsent,
    DEFAULT_CONSENT
} from '@/lib/cookie-consent';

export default function CookieConsent() {
    const [mounted, setMounted] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [preferences, setPreferences] = useState<Pick<CookieConsent, 'analytics' | 'marketing'>>({
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const consent = getStoredConsent();
        setShowBanner(!consent);
        if (consent && !consent.analytics) {
            posthog.opt_out_capturing();
        }
    }, [mounted]);

    useEffect(() => {
        const handleOpenPreferences = () => {
            const stored = getStoredConsent();
            if (stored) {
                setPreferences({ analytics: stored.analytics, marketing: stored.marketing });
            }
            setShowModal(true);
        };
        window.addEventListener('open-cookie-preferences', handleOpenPreferences);
        return () => window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowModal(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const applyConsent = (consent: CookieConsent) => {
        saveConsent(consent);
        setShowBanner(false);
        setShowModal(false);
        if (consent.analytics) {
            posthog.opt_in_capturing();
        } else {
            posthog.opt_out_capturing();
        }
        window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: consent }));
    };

    const handleAcceptAll = () => {
        applyConsent({
            ...DEFAULT_CONSENT,
            essential: true,
            analytics: true,
            marketing: true
        });
    };

    const handleRejectNonEssential = () => {
        applyConsent({
            ...DEFAULT_CONSENT,
            essential: true,
            analytics: false,
            marketing: false
        });
    };

    const handleManagePreferences = () => {
        const stored = getStoredConsent();
        if (stored) {
            setPreferences({ analytics: stored.analytics, marketing: stored.marketing });
        }
        setShowModal(true);
    };

    const handleSavePreferences = () => {
        applyConsent({
            ...DEFAULT_CONSENT,
            essential: true,
            analytics: preferences.analytics,
            marketing: preferences.marketing
        });
    };

    if (!mounted) return null;

    return (
        <>
            {/* Banner – only when no consent stored */}
            {showBanner && (
            <div
                className='fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up'
                role='dialog'
                aria-labelledby='cookie-banner-title'
                aria-describedby='cookie-banner-desc'
            >
                <div className='mx-auto max-w-6xl px-4 pb-4 sm:px-6'>
                    <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-900/10 sm:p-6'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                            <div className='flex-1'>
                                <h2 id='cookie-banner-title' className='text-base font-semibold text-gray-900 sm:text-lg'>
                                    We use cookies
                                </h2>
                                <p id='cookie-banner-desc' className='mt-1 text-sm text-gray-600'>
                                    We use cookies to enhance your experience, analyze site traffic, and assist in marketing
                                    efforts. You can choose which cookies to allow.{' '}
                                    <Link
                                        href='/privacy-policy'
                                        className='font-medium text-[#0C4C55] underline underline-offset-2 hover:text-[#08353B]'
                                    >
                                        Privacy Policy
                                    </Link>
                                </p>
                                {/* App download – desktop only, combined with cookie banner */}
                                <div className='mt-4 hidden items-center gap-4 border-t border-gray-100 pt-4 md:flex'>
                                    <span className='text-sm font-medium text-gray-600'>Get the app:</span>
                                    <AppDownloadButtons source='cookie_banner_desktop' imageClassName='h-9' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3'>
                                <button
                                    type='button'
                                    onClick={handleRejectNonEssential}
                                    className='order-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:order-1'
                                >
                                    Reject Non-Essential
                                </button>
                                <button
                                    type='button'
                                    onClick={handleManagePreferences}
                                    className='order-3 text-sm font-medium text-[#0C4C55] underline underline-offset-2 hover:text-[#08353B]'
                                >
                                    Manage Preferences
                                </button>
                                <button
                                    type='button'
                                    onClick={handleAcceptAll}
                                    className='order-1 rounded-xl bg-[#0C4C55] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#08353B] sm:order-2'
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* Preferences Modal */}
            {showModal && (
                <div
                    className='fixed inset-0 z-[10000] flex items-center justify-center p-4'
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby='cookie-modal-title'
                >
                    <div
                        className='absolute inset-0 bg-gray-900/50 backdrop-blur-sm'
                        onClick={() => setShowModal(false)}
                        aria-hidden='true'
                    />
                    <div className='relative w-full max-w-md animate-in fade-in zoom-in-95 rounded-2xl bg-white p-6 shadow-2xl'>
                        <h2 id='cookie-modal-title' className='text-xl font-bold text-gray-900'>
                            Cookie Preferences
                        </h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            Choose which cookies you allow. Essential cookies are always active and are required for the
                            site to function.
                        </p>

                        <div className='mt-6 space-y-4'>
                            {/* Essential - locked */}
                            <div className='flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3'>
                                <div>
                                    <p className='font-medium text-gray-900'>Essential</p>
                                    <p className='text-xs text-gray-500'>Required for core functionality</p>
                                </div>
                                <span className='rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600'>
                                    Always active
                                </span>
                            </div>

                            {/* Analytics */}
                            <div className='flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3'>
                                <div>
                                    <p className='font-medium text-gray-900'>Analytics</p>
                                    <p className='text-xs text-gray-500'>Help us understand how visitors use the site</p>
                                </div>
                                <button
                                    type='button'
                                    role='switch'
                                    aria-checked={preferences.analytics}
                                    onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                                        preferences.analytics ? 'bg-[#0C4C55]' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                            preferences.analytics ? 'left-6' : 'left-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Marketing */}
                            <div className='flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3'>
                                <div>
                                    <p className='font-medium text-gray-900'>Marketing</p>
                                    <p className='text-xs text-gray-500'>Used for personalized ads and campaigns</p>
                                </div>
                                <button
                                    type='button'
                                    role='switch'
                                    aria-checked={preferences.marketing}
                                    onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                                        preferences.marketing ? 'bg-[#0C4C55]' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                            preferences.marketing ? 'left-6' : 'left-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className='mt-6 flex gap-3'>
                            <button
                                type='button'
                                onClick={() => setShowModal(false)}
                                className='flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={handleSavePreferences}
                                className='flex-1 rounded-xl bg-[#0C4C55] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#08353B]'
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
