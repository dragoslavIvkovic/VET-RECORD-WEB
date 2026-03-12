/**
 * Smart App Banner utilities – OS detection and 7-day dismissal state
 */

import { hasValidConsent } from './cookie-consent';

const DISMISSAL_KEY = 'vetrecord_app_banner_dismissed';
const DISMISSAL_DAYS = 7;

export type MobileOS = 'ios' | 'android' | null;

/**
 * Detects if the user is on iOS or Android (mobile only).
 * Returns null for desktop or unknown mobile OS.
 */
export function detectMobileOS(): MobileOS {
    if (typeof window === 'undefined') return null;
    const ua = navigator.userAgent || navigator.vendor;
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return 'ios';
    if (/android/i.test(ua)) return 'android';
    return null;
}

/**
 * Checks if the banner was dismissed within the last 7 days.
 */
export function isBannerDismissed(): boolean {
    if (typeof window === 'undefined') return true;
    try {
        const raw = localStorage.getItem(DISMISSAL_KEY);
        if (!raw) return false;
        const timestamp = parseInt(raw, 10);
        if (isNaN(timestamp)) return false;
        const now = Date.now();
        const sevenDaysMs = DISMISSAL_DAYS * 24 * 60 * 60 * 1000;
        return now - timestamp < sevenDaysMs;
    } catch {
        return false;
    }
}

/**
 * Saves the dismissal timestamp. Banner will not show for 7 days.
 */
export function dismissBanner(): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
    } catch {
        // ignore
    }
}

/**
 * Returns true if the banner should be shown (consent done + not dismissed).
 * On mobile: iOS/Android. On desktop: also show (with both store links).
 * Don't show app banner while cookie consent is visible.
 */
export function shouldShowBanner(): boolean {
    if (typeof window === 'undefined') return false;
    if (!hasValidConsent()) return false;
    return !isBannerDismissed();
}

/**
 * True if desktop (no mobile OS detected).
 */
export function isDesktop(): boolean {
    return detectMobileOS() === null;
}
