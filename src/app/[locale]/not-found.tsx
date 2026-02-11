'use client';

import { useTranslations } from '@/i18n/translations-context';
import { LocalizedLink } from '../components/LocalizedLink';

export default function NotFound() {
    const t = useTranslations();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">{t('notFound.title')}</h1>
            <p className="mb-8 text-lg text-gray-600">{t('notFound.description')}</p>
            <LocalizedLink
                href="/"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
                {t('notFound.backHome')}
            </LocalizedLink>
        </div>
    );
}
