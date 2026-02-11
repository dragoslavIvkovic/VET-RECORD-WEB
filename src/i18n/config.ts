/**
 * i18n Configuration
 * Default: sr-Latn (Serbian Latin)
 * Target: RS, ME, BA, HR, Global (en)
 */

export const locales = ['sr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sr';

export const localeNames: Record<Locale, string> = {
    sr: 'Srpski',
    en: 'English',
};

export const localeFlags: Record<Locale, string> = {
    sr: '🇷🇸',
    en: '🇬🇧',
};

/** hreflang mapping for SEO */
export const localeToHreflang: Record<Locale, string> = {
    sr: 'sr-Latn',
    en: 'en',
};
