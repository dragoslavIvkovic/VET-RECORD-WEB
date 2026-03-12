/**
 * Cookie consent types and localStorage utilities (GDPR/CCPA compliant)
 */

export const COOKIE_CONSENT_KEY = 'vetrecord_cookie_consent';
export const COOKIE_CONSENT_VERSION = 1;

export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export type CookieConsent = {
    essential: true; // Always true, cannot be disabled
    analytics: boolean;
    marketing: boolean;
    timestamp: number;
    version: number;
};

export const DEFAULT_CONSENT: CookieConsent = {
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
    version: COOKIE_CONSENT_VERSION
};

export function getStoredConsent(): CookieConsent | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CookieConsent;
        if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveConsent(consent: CookieConsent): void {
    if (typeof window === 'undefined') return;
    const toStore: CookieConsent = {
        ...consent,
        essential: true,
        timestamp: Date.now(),
        version: COOKIE_CONSENT_VERSION
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(toStore));
}

export function hasValidConsent(): boolean {
    return getStoredConsent() !== null;
}
