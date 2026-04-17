'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';

import { APP_LINKS } from '../config/links';
import { usePostHog } from 'posthog-js/react';
import AppDownloadButtons from './AppDownloadButtons';

export default function NavigationBar() {
    const posthog = usePostHog();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const moreRef = useRef<HTMLDivElement>(null);

    const scrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsMenuOpen(false);
        posthog.capture('scroll_to_reviews_clicked');
        const el = document.getElementById('reviews');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            el.focus({ preventScroll: true });
        } else {
            window.location.href = '/#reviews';
        }
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
                setIsMoreOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const linkBase = 'whitespace-nowrap transition-colors hover:text-cyan-300';

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#0C4C55]/95 backdrop-blur-md'>
            <div className='container mx-auto px-4'>
                <div className='flex h-16 items-center justify-between gap-3 lg:h-[72px]'>
                    {/* ── Logo ────────────────────────────────── */}
                    <Link href='/' className='shrink-0'>
                        <Image src='/logo.svg' alt='Vet Record' width={120} height={40} style={{ width: 'auto', height: 'auto' }} className='h-9 lg:h-10' priority />
                    </Link>

                    {/* ── Desktop nav (lg+) ───────────────────── */}
                    <div className='hidden flex-1 items-center justify-end gap-5 lg:flex xl:gap-7'>
                        {/* Primary links */}
                        <div className='flex items-center gap-1 text-[15px] font-medium text-white'>
                            <Link href='/' className={`${linkBase} rounded-lg px-3 py-2`}>
                                Home
                            </Link>
                            <Link href='/blog' className={`${linkBase} rounded-lg px-3 py-2`}>
                                Blog
                            </Link>
                            <Link href='/calculator' className={`${linkBase} rounded-lg px-3 py-2`}>
                                Calculator
                            </Link>
                            <a
                                href='#reviews'
                                onClick={scrollToReviews}
                                className={`${linkBase} cursor-pointer rounded-lg px-3 py-2`}>
                                Reviews
                            </a>
                            <Link href='/contact' className={`${linkBase} rounded-lg px-3 py-2`}>
                                Contact
                            </Link>

                            {/* "More" dropdown for secondary links */}
                            <div className='relative' ref={moreRef}>
                                <button
                                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                                    className={`${linkBase} flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2`}>
                                    More
                                    <svg
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2.5}
                                            d='M19 9l-7 7-7-7'
                                        />
                                    </svg>
                                </button>

                                {isMoreOpen && (
                                    <div className='absolute top-full right-0 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#0C4C55] shadow-xl ring-1 ring-black/10'>
                                        <Link
                                            href='/faq'
                                            className='block px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-cyan-300'
                                            onClick={() => setIsMoreOpen(false)}>
                                            FAQ
                                        </Link>
                                        <Link
                                            href='/about'
                                            className='block px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-cyan-300'
                                            onClick={() => setIsMoreOpen(false)}>
                                            About Us
                                        </Link>
                                        <Link
                                            href='/privacy-policy'
                                            className='block px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-cyan-300'
                                            onClick={() => setIsMoreOpen(false)}>
                                            Privacy Policy
                                        </Link>
                                        <Link
                                            href='/delete-data'
                                            className='block px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-cyan-300'
                                            onClick={() => setIsMoreOpen(false)}>
                                            Delete Data
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='h-6 w-px bg-white/20' />

                        {/* Store badges */}
                        <AppDownloadButtons source='navigation' imageClassName='h-9' priority />
                    </div>

                    {/* ── Mobile hamburger (< lg) ────────────── */}
                    <button
                        className='shrink-0 p-2 text-white lg:hidden'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'>
                        {isMenuOpen ? (
                            <svg className='h-7 w-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        ) : (
                            <svg className='h-7 w-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ────────────────────────────────── */}
            {isMenuOpen && (
                <div className='contents'>
                    <div
                        className='fixed inset-0 top-16 z-[55] bg-black/40 lg:hidden'
                        aria-hidden
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className='fixed inset-x-0 top-16 z-[60] max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-[#0C4C55] shadow-2xl lg:hidden'>
                        <div className='flex flex-col p-3'>
                            {/* Primary */}
                            <p className='px-4 pt-2 pb-1 text-[11px] font-semibold tracking-widest text-white/40 uppercase'>
                                Menu
                            </p>
                            <Link
                                href='/'
                                className='rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link
                                href='/blog'
                                className='rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                Blog
                            </Link>
                            <Link
                                href='/calculator'
                                className='rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                Calculator
                            </Link>
                            <a
                                href='#reviews'
                                onClick={scrollToReviews}
                                className='cursor-pointer rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-cyan-300'>
                                Reviews
                            </a>
                            <Link
                                href='/contact'
                                className='rounded-lg px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>

                            {/* Divider */}
                            <div className='mx-4 my-2 border-t border-white/10' />

                            {/* Secondary */}
                            <p className='px-4 pt-2 pb-1 text-[11px] font-semibold tracking-widest text-white/40 uppercase'>
                                More
                            </p>
                            <Link
                                href='/faq'
                                className='rounded-lg px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                FAQ
                            </Link>
                            <Link
                                href='/about'
                                className='rounded-lg px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                About Us
                            </Link>
                            <Link
                                href='/privacy-policy'
                                className='rounded-lg px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                Privacy Policy
                            </Link>
                            <Link
                                href='/delete-data'
                                className='rounded-lg px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-cyan-300'
                                onClick={() => setIsMenuOpen(false)}>
                                Delete Data
                            </Link>

                            {/* Store badges */}
                            <div className='mx-4 my-2 border-t border-white/10' />
                            <AppDownloadButtons 
                                source='navigation_mobile' 
                                containerClassName='flex items-center justify-center gap-3 px-4 py-3' 
                                imageClassName='h-10' 
                            />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
