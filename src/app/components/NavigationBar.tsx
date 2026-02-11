'use client';

import { useState } from 'react';
import { APP_LINKS } from '../config/links';
import { useTranslations } from '@/i18n/translations-context';
import { LocalizedLink } from './LocalizedLink';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = useTranslations();

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-[#0C4C55]">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    <div className="w-[200px] shrink-0">
                        <LocalizedLink href="/" className="flex items-center">
                            <img
                                src="/logo.svg"
                                alt={t('common.altLogo')}
                                className="h-12 w-auto"
                            />
                        </LocalizedLink>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        <div className="flex items-center gap-6 text-lg font-medium text-white">
                            <LocalizedLink
                                href="/"
                                className="whitespace-nowrap transition-colors hover:text-cyan-300"
                            >
                                {t('nav.home')}
                            </LocalizedLink>
                            <LocalizedLink
                                href="/#reviews"
                                className="whitespace-nowrap transition-colors hover:text-cyan-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nav.reviews')}
                            </LocalizedLink>
                            <LocalizedLink
                                href="/contact"
                                className="whitespace-nowrap transition-colors hover:text-cyan-300"
                            >
                                {t('nav.contact')}
                            </LocalizedLink>
                            <LocalizedLink
                                href="/about"
                                className="whitespace-nowrap transition-colors hover:text-cyan-300"
                            >
                                {t('nav.about')}
                            </LocalizedLink>
                            <LocalizedLink
                                href="/privacy-policy"
                                className="whitespace-nowrap transition-colors hover:text-cyan-300"
                            >
                                {t('nav.privacy')}
                            </LocalizedLink>
                            <LocalizedLink
                                href="/delete-data"
                                className="whitespace-nowrap transition-colors hover:text-cyan-300"
                            >
                                {t('nav.deleteData')}
                            </LocalizedLink>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition hover:scale-105"
                            >
                                <img
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                    alt={t('common.altAndroid')}
                                    className="h-14 w-auto"
                                />
                            </a>
                            <a
                                href={APP_LINKS.APP_STORE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition hover:scale-105"
                            >
                                <img
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                                    alt={t('common.altiOS')}
                                    className="h-10 w-auto"
                                />
                            </a>
                        </div>
                        <LanguageSwitcher />
                    </div>

                    <button
                        className="p-2 text-white md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={t('nav.toggleMenu')}
                    >
                        {isMenuOpen ? (
                            <svg
                                className="h-8 w-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-8 w-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-20 right-0 left-0 border-t border-white/10 bg-[#0C4C55] p-4 shadow-xl md:hidden">
                    <div className="flex flex-col space-y-4 text-center text-lg font-medium text-white">
                        <LocalizedLink
                            href="/"
                            className="rounded-lg py-2 transition-colors hover:bg-white/10 hover:text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.home')}
                        </LocalizedLink>
                        <LocalizedLink
                            href="/#reviews"
                            className="rounded-lg py-2 transition-colors hover:bg-white/10 hover:text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.reviews')}
                        </LocalizedLink>
                        <LocalizedLink
                            href="/contact"
                            className="rounded-lg py-2 transition-colors hover:bg-white/10 hover:text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.contact')}
                        </LocalizedLink>
                        <LocalizedLink
                            href="/about"
                            className="rounded-lg py-2 transition-colors hover:bg-white/10 hover:text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.about')}
                        </LocalizedLink>
                        <LocalizedLink
                            href="/privacy-policy"
                            className="rounded-lg py-2 transition-colors hover:bg-white/10 hover:text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.privacy')}
                        </LocalizedLink>
                        <LocalizedLink
                            href="/delete-data"
                            className="rounded-lg py-2 transition-colors hover:bg-white/10 hover:text-cyan-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.deleteData')}
                        </LocalizedLink>

                        <div className="mt-4 flex flex-col items-center gap-4 border-t border-white/10 pt-4">
                            <div className="flex w-full justify-end px-2">
                                <LanguageSwitcher />
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <a
                                    href={APP_LINKS.GOOGLE_PLAY}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                                        alt={t('common.altAndroid')}
                                        className="h-14 w-auto"
                                    />
                                </a>
                                <a
                                    href={APP_LINKS.APP_STORE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                                        alt={t('common.altiOS')}
                                        className="h-10 w-auto"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
