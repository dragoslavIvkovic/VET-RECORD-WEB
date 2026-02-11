'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Locale } from './config';
import { createTranslator } from './get-messages';
import type { Messages } from './get-messages';

type MessagesType = Record<string, unknown>;

const I18nContext = createContext<{
    locale: Locale;
    t: (key: string, params?: Record<string, string | number>) => string;
} | null>(null);

export function I18nProvider({
    locale,
    messages,
    children,
}: {
    locale: Locale;
    messages: MessagesType;
    children: React.ReactNode;
}) {
    const value = useMemo(() => {
        const t = createTranslator(messages as Messages, locale);
        return { locale, t };
    }, [locale, messages]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslations must be used within I18nProvider');
    }
    return context.t;
}

export function useLocale() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useLocale must be used within I18nProvider');
    }
    return context.locale;
}
