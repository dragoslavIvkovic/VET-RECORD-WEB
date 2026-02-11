'use client';

import { useTranslations } from '@/i18n/translations-context';

export function DeleteDataContent() {
    const t = useTranslations();

    return (
        <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
            <div className="w-full max-w-4xl rounded-lg bg-white p-8 text-[#0C4C55] shadow-xl">
                <h1 className="mb-8 text-4xl font-bold">{t('deleteData.title')}</h1>

                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold">{t('deleteData.howTo')}</h2>

                    <div className="mb-8 rounded-lg bg-gray-50 p-6">
                        <h3 className="mb-4 text-xl font-semibold">{t('deleteData.option1.title')}</h3>
                        <ol className="list-decimal space-y-3 pl-6 text-gray-700">
                            <li className="leading-relaxed">{t('deleteData.option1.step1')}</li>
                            <li className="leading-relaxed">{t('deleteData.option1.step2')}</li>
                            <li className="leading-relaxed">{t('deleteData.option1.step3')}</li>
                            <li className="leading-relaxed">{t('deleteData.option1.step4')}</li>
                        </ol>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-6">
                        <h3 className="mb-4 text-xl font-semibold">{t('deleteData.option2.title')}</h3>
                        <p className="mb-4 text-gray-700">
                            {t('deleteData.option2.intro')}{' '}
                            <span className="font-medium text-cyan-600">ivkemilioner2@gmail.com</span>{' '}
                            {t('deleteData.option2.with')}
                        </p>
                        <ul className="list-disc space-y-3 pl-6 text-gray-700">
                            <li className="leading-relaxed">{t('deleteData.option2.subject')}</li>
                            <li className="leading-relaxed">{t('deleteData.option2.deviceId')}</li>
                            <li className="leading-relaxed">{t('deleteData.option2.startDate')}</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('deleteData.whatDeleted.title')}</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                        <ul className="list-disc space-y-3 pl-6 text-gray-700">
                            <li className="leading-relaxed">{t('deleteData.whatDeleted.petRecords')}</li>
                            <li className="leading-relaxed">{t('deleteData.whatDeleted.usage')}</li>
                            <li className="leading-relaxed">{t('deleteData.whatDeleted.device')}</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('deleteData.retention.title')}</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                        <ul className="list-disc space-y-3 pl-6 text-gray-700">
                            <li className="leading-relaxed">{t('deleteData.retention.process')}</li>
                            <li className="leading-relaxed">{t('deleteData.retention.legal')}</li>
                            <li className="leading-relaxed">{t('deleteData.retention.inactive')}</li>
                        </ul>
                    </div>
                </section>

                <div className="mt-8 rounded-lg bg-gray-50 p-6">
                    <p className="text-sm text-gray-600">{t('deleteData.note')}</p>
                </div>
            </div>
        </main>
    );
}
