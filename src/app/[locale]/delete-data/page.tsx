import type { Metadata } from 'next';
import { getMessages } from '@/i18n/get-messages';
import type { Locale } from '@/i18n/config';
import { DeleteDataContent } from './DeleteDataContent';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages(locale as Locale);
    const t = createT(messages);

    return {
        title: `${t('deleteData.title')} - Vet Record`,
        description: t('deleteData.howTo'),
        alternates: {
            canonical: `https://www.vetrecord.app/${locale}/delete-data`,
        },
    };
}

function createT(messages: Record<string, unknown>) {
    return (key: string): string => {
        const keys = key.split('.');
        let current: unknown = messages;
        for (const k of keys) {
            current = (current as Record<string, unknown>)?.[k];
        }
        return (typeof current === 'string' ? current : key) as string;
    };
}

export default async function DeleteData() {
    return <DeleteDataContent />;
}
