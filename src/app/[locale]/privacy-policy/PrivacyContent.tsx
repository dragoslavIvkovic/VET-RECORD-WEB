'use client';

import { useTranslations } from '@/i18n/translations-context';

export function PrivacyContent() {
    const t = useTranslations();

    return (
        <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
            <div className="w-full max-w-4xl rounded-lg bg-white p-8 text-[#0C4C55] shadow-xl">
                <h1 className="mb-2 text-4xl font-bold">{t('privacy.title')}</h1>
                <p className="mb-8 text-gray-500">{t('privacy.lastUpdated')}</p>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.intro.title')}</h2>
                    <p className="mb-4 leading-relaxed text-gray-700">{t('privacy.intro.text')}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.contact.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacy.contact.text')}</p>
                    <ul className="space-y-2 rounded-lg bg-gray-50 p-4 text-gray-700">
                        <li className="flex items-center">
                            <span className="mr-2">📧</span>
                            Email: ivkemilioner2@gmail.com
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">🏢</span>
                            Company: VET RECORD
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2">📍</span>
                            Location: {t('contact.serbia')}
                        </li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.dataCollection.title')}</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                        <h3 className="mb-4 text-xl font-medium">{t('privacy.dataCollection.weCollect')}</h3>
                        <p className="mb-4 text-gray-700">{t('privacy.dataCollection.intro')}</p>
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                            <li>{t('privacy.dataCollection.usage')}</li>
                            <li>{t('privacy.dataCollection.device')}</li>
                            <li>{t('privacy.dataCollection.petRecords')}</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.dataSecurity.title')}</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                        <p className="mb-4 text-gray-700">{t('privacy.dataSecurity.text')}</p>
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                            <li>{t('privacy.dataSecurity.encryption')}</li>
                            <li>{t('privacy.dataSecurity.assessments')}</li>
                            <li>{t('privacy.dataSecurity.storage')}</li>
                            <li>{t('privacy.dataSecurity.access')}</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.thirdParty.title')}</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                        <p className="mb-4 text-gray-700">{t('privacy.thirdParty.intro')}</p>
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                            <li>{t('privacy.thirdParty.google')}</li>
                            <li>{t('privacy.thirdParty.firebase')}</li>
                            <li>{t('privacy.thirdParty.crash')}</li>
                        </ul>
                        <p className="mt-4 text-gray-700">{t('privacy.thirdParty.compliance')}</p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.rights.title')}</h2>
                    <div className="rounded-lg bg-gray-50 p-6">
                        <p className="mb-4 text-gray-700">{t('privacy.rights.text')}</p>
                        <ul className="list-inside list-disc space-y-2 text-gray-700">
                            <li>{t('privacy.rights.access')}</li>
                            <li>{t('privacy.rights.delete')}</li>
                            <li>{t('privacy.rights.object')}</li>
                            <li>{t('privacy.rights.portability')}</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.updates.title')}</h2>
                    <p className="text-gray-700">{t('privacy.updates.text')}</p>
                </section>

                <section className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold">{t('privacy.compliance.title')}</h2>
                    <p className="text-gray-700">{t('privacy.compliance.text')}</p>
                </section>
            </div>
        </main>
    );
}
