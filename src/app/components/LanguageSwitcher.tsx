'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/translations-context';
import { locales, localeNames, localeFlags } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const currentLocale = useLocale();

    const getLocalizedPath = (newLocale: Locale) => {
        if (!pathname) return `/${newLocale}`;
        const segments = pathname.split('/').filter(Boolean);
        const pathWithoutLocale = segments.slice(1).join('/');
        return `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    };

    return (
        <div className="flex items-center gap-2">
            {locales.map((locale) => (
                <a
                    key={locale}
                    href={getLocalizedPath(locale)}
                    title={localeNames[locale]}
                    aria-label={localeNames[locale]}
                    className={`rounded px-2 py-1 text-xl transition ${
                        currentLocale === locale
                            ? 'bg-white/20 ring-1 ring-white/30'
                            : 'opacity-70 hover:bg-white/10 hover:opacity-100'
                    }`}
                    aria-current={currentLocale === locale ? 'page' : undefined}
                >
                    {localeFlags[locale]}
                </a>
            ))}
        </div>
    );
}
