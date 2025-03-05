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

    const scrollToReviews = () => {
        setIsMenuOpen(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <nav
            className='fixed top-0 right-0 left-0 z-50 border-b border-white'
            style={{ backgroundColor: theme.colors.primary }}>
            <div className='container mx-auto   max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='w-[200px]'>
                        <Link href='/' className='flex items-center' onClick={closeMenu}>
                            <img src='/logo.svg' alt='Vet Record Logo' className='h-14 w-auto' />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden items-center space-x-8 md:flex'>
                        <Link href='/' className='text-white hover:text-cyan-300'>
                            Home
                        </Link>
                        <button type='button' onClick={scrollToReviews} className='text-white hover:text-cyan-300'>
                            Reviews
                        </button>
                        <Link href='/contact' className='text-white hover:text-cyan-300'>
                            Contact
                        </Link>
                        <Link href='/about' className='text-white hover:text-cyan-300'>
                            About us
                        </Link>
                        <Link href='/privacy-policy' className='text-white hover:text-cyan-300'>
                            Privacy Policy
                        </Link>
                        <Link href='/delete-data' className='text-white hover:text-cyan-300'>
                            Delete Data
                        </Link>
                        <a
                            href='https://play.google.com/store/apps/details?id=vetrecord.app'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-full px-6 py-2 hover:opacity-90'
                            style={{
                                backgroundColor: theme.colors.white,
                                color: theme.colors.primary
                            }}>
                            Download
                        </a>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button
                        type='button'
                        onClick={toggleMenu}
                        className='flex h-10 w-10 items-center justify-center rounded-lg md:hidden'
                        aria-label='Toggle menu'>
                        <div className='relative h-6 w-6'>
                            <span
                                className={`absolute block h-0.5 w-6 transform bg-white transition duration-300 ease-in-out ${
                                    isMenuOpen ? 'top-2 rotate-45' : 'top-1'
                                }`}
                            />
                            <span
                                className={`absolute top-2.5 block h-0.5 w-6 bg-white transition-opacity duration-300 ease-in-out ${
                                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            <span
                                className={`absolute block h-0.5 w-6 transform bg-white transition duration-300 ease-in-out ${
                                    isMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                                }`}
                            />
                        </div>
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={`fixed top-16 right-0 bottom-0 left-0 z-50 mt-20 transform overflow-y-auto bg-[#0C4C55] transition-transform duration-300 ease-in-out md:hidden ${
                            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}>
                        <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center space-y-6 p-8'>
                            <Link href='/' className='text-white hover:text-cyan-300' onClick={closeMenu}>
                                Home
                            </Link>
                            <button type='button' onClick={scrollToReviews} className='text-white hover:text-cyan-300'>
                                Reviews
                            </button>
                            <Link href='/contact' className='text-white hover:text-cyan-300' onClick={closeMenu}>
                                Contact
                            </Link>
                            <Link href='/about' className='text-white hover:text-cyan-300' onClick={closeMenu}>
                                About us
                            </Link>
                            <Link href='/privacy-policy' className='text-white hover:text-cyan-300' onClick={closeMenu}>
                                Privacy Policy
                            </Link>
                            <Link href='/delete-data' className='text-white hover:text-cyan-300' onClick={closeMenu}>
                                Delete Data
                            </Link>
                            <a
                                href='https://play.google.com/store/apps/details?id=vetrecord.app'
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={closeMenu}
                                className='mt-4 rounded-full px-6 py-2 hover:opacity-90'
                                style={{
                                    backgroundColor: theme.colors.white,
                                    color: theme.colors.primary
                                }}>
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
