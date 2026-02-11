import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

/**
 * Root not-found: redirects to default locale 404.
 * Actual 404 UI is in app/[locale]/not-found.tsx
 */
export default function RootNotFound() {
    redirect(`/${defaultLocale}`);
}
