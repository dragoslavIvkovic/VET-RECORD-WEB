'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useTheme } from '../providers/ThemeProvider';

export default function NavigationBar() {
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsMenuOpen(false); // Close menu on mobile
        if (pathname !== '/') {
            router.push('/', { scroll: false });
            setTimeout(() => {
                const reviewsSection = document.querySelector('#reviews');
                if (reviewsSection) {
                    reviewsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const reviewsSection = document.querySelector('#reviews');
            if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav
            className='fixed top-0 right-0 left-0 z-50 border-b border-white'
            style={{ backgroundColor: theme.colors.primary }}>
            <div className='container mx-auto px-4'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='w-[120px] md:w-[200px]'>
                        <Link href='/' className='flex items-center'>
                            <img src='/logo.svg' alt='Vet Record Logo' className='h-10 w-auto md:h-14' />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className='rounded-md p-2 text-white focus:outline-none md:hidden'
                        aria-label='Toggle menu'>
                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <div className='hidden space-x-8 md:flex'>
                        <Link href='/' className='text-lg font-semibold text-white hover:text-cyan-300'>
                            Home
                        </Link>
                        <button
                            onClick={scrollToReviews}
                            className='text-lg font-semibold text-white hover:text-cyan-300'>
                            Reviews
                        </button>
                        <Link href='/contact' className='text-lg font-semibold text-white hover:text-cyan-300'>
                            Contact
                        </Link>
                        <Link href='/about' className='text-lg font-semibold text-white hover:text-cyan-300'>
                            About us
                        </Link>
                        <Link href='/privacy-policy' className='text-lg font-semibold text-white hover:text-cyan-300'>
                            Privacy Policy
                        </Link>
                        <Link href='/delete-data' className='text-lg font-semibold text-white hover:text-cyan-300'>
                            Delete Data
                        </Link>
                    </div>

                    {/* Download Button */}
                    <div className='hidden md:block'>
                        <a
                            href='https://play.google.com/store/apps/details?id=vetrecord.app'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-full px-6 py-2 font-semibold hover:opacity-90'
                            style={{
                                backgroundColor: theme.colors.white,
                                color: theme.colors.primary
                            }}>
                            Download
                        </a>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='md:hidden'>
                        <div className='space-y-2 pt-4 pb-4'>
                            <Link
                                href='/'
                                className='block px-4 py-2 text-lg font-semibold text-white hover:bg-white/10'
                                onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <button
                                onClick={scrollToReviews}
                                className='block w-full px-4 py-2 text-left text-lg font-semibold text-white hover:bg-white/10'>
                                Reviews
                            </button>
                            <Link
                                href='/contact'
                                className='block px-4 py-2 text-lg font-semibold text-white hover:bg-white/10'
                                onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>
                            <Link
                                href='/about'
                                className='block px-4 py-2 text-lg font-semibold text-white hover:bg-white/10'
                                onClick={() => setIsMenuOpen(false)}>
                                About us
                            </Link>
                            <Link
                                href='/privacy-policy'
                                className='block px-4 py-2 text-lg font-semibold text-white hover:bg-white/10'
                                onClick={() => setIsMenuOpen(false)}>
                                Privacy Policy
                            </Link>
                            <Link
                                href='/delete-data'
                                className='block px-4 py-2 text-lg font-semibold text-white hover:bg-white/10'
                                onClick={() => setIsMenuOpen(false)}>
                                Delete Data
                            </Link>
                            <a
                                href='https://play.google.com/store/apps/details?id=vetrecord.app'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mt-4 block rounded-full px-6 py-2 text-center font-semibold'
                                style={{
                                    backgroundColor: theme.colors.white,
                                    color: theme.colors.primary
                                }}
                                onClick={() => setIsMenuOpen(false)}>
                                Download
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
