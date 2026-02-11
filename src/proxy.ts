import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const LOCALE_COOKIE = 'NEXT_LOCALE';

/** RS, ME, BA, HR → sr-Latn | Ostalo → en */
const SR_COUNTRIES = ['RS', 'ME', 'BA', 'HR'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip static files and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/fonts') ||
        pathname.startsWith('/logo') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has locale prefix
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        const locale = pathname.split('/')[1] as string;
        if (!locales.includes(locale as (typeof locales)[number])) {
            const newUrl = new URL(`/${defaultLocale}${pathname.replace(`/${locale}`, '')}`, request.url);
            const response = NextResponse.redirect(newUrl);
            response.cookies.set(LOCALE_COOKIE, defaultLocale, { path: '/' });
            return response;
        }
        const response = NextResponse.next();
        response.cookies.set(LOCALE_COOKIE, locale, { path: '/' });
        return response;
    }

    // Detect locale: cookie > geo (zemlja) > Accept-Language > default
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const preferredLocale =
        cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])
            ? cookieLocale
            : getLocaleFromGeo(request) ?? getPreferredLocale(request.headers.get('accept-language') ?? '');

    // Redirect / to /sr/ or /en/
    const newUrl = new URL(`/${preferredLocale}${pathname === '/' ? '' : pathname}`, request.url);
    const response = NextResponse.redirect(newUrl);
    response.cookies.set(LOCALE_COOKIE, preferredLocale, { path: '/' });
    return response;
}

function getLocaleFromGeo(request: NextRequest): string | null {
    const country = request.headers.get('x-vercel-ip-country') ?? request.geo?.country;
    if (!country) return null;
    return SR_COUNTRIES.includes(country.toUpperCase()) ? 'sr' : 'en';
}

function getPreferredLocale(acceptLanguage: string): string {
    const parts = acceptLanguage
        .split(',')
        .map((p) => {
            const [lang, q = 'q=1'] = p.trim().split(';');
            const quality = parseFloat(q.replace('q=', '')) || 1;
            return { lang: lang.split('-')[0].toLowerCase(), quality };
        })
        .sort((a, b) => b.quality - a.quality);

    for (const { lang } of parts) {
        if (lang === 'sr') return 'sr';
        if (lang === 'en') return 'en';
    }

    return defaultLocale;
}

export const config = {
    matcher: ['/((?!_next|api|favicon|images|fonts|logo|.*\\..*).*)'],
};
