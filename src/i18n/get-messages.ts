import type { Locale } from './config';

type Messages = Record<string, unknown>;

const messageCache: Partial<Record<Locale, Messages>> = {};

export async function getMessages(locale: Locale): Promise<Messages> {
    if (messageCache[locale]) {
        return messageCache[locale] as Messages;
    }

    const messages = await import(`./messages/${locale}.json`);
    messageCache[locale] = messages.default;
    return messages.default;
}

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
        if (current === null || current === undefined || typeof current !== 'object') {
            return undefined;
        }
        current = (current as Record<string, unknown>)[key];
    }

    return typeof current === 'string' ? current : undefined;
}

/**
 * Replace placeholders like {year} with values
 */
function interpolate(str: string, params?: Record<string, string | number>): string {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
}

export function createTranslator(messages: Messages, locale: Locale) {
    return function t(key: string, params?: Record<string, string | number>): string {
        const value = getNestedValue(messages as Record<string, unknown>, key);
        return value ? interpolate(value, params) : key;
    };
}
