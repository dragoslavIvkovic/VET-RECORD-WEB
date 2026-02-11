'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLocale } from '@/i18n/translations-context';

type LinkProps = ComponentProps<typeof Link>;

export function LocalizedLink({ href, ...props }: LinkProps) {
    const locale = useLocale();

    const localizedHref =
        typeof href === 'string'
            ? href.startsWith('#')
                ? href
                : href.startsWith('http')
                  ? href
                  : (() => {
                        const [path, hash] = href.split('#');
                        const base = path.startsWith('/') ? path : `/${path}`;
                        const localized = `/${locale}${base === '/' ? '' : base}`;
                        return hash ? `${localized}#${hash}` : localized;
                    })()
            : href;

    return <Link href={localizedHref} {...props} />;
}

export function getLocalizedPath(path: string, locale: string): string {
    if (path.startsWith('#') || path.startsWith('http')) return path;
    return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}
