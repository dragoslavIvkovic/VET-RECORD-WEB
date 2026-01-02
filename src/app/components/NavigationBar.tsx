'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_LINKS } from '../constants/app-links';

export default function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 border-b border-white/20 bg-[#0C4C55]'>
            <div className='container mx-auto px-4'>
                <div className='flex h-20 items-center justify-between'>
                    {/* Logo */}
                    <div className='w-[200px] shrink-0'>
                        <Link href='/' className='flex items-center'>
                            <img src='/logo.svg' alt='Vet Record Logo' className='h-12 w-auto' />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden items-center gap-8 md:flex'>
                        <div className='flex items-center gap-6 text-lg font-medium text-white'>
                            <Link href='/' className='whitespace-nowrap hover:text-cyan-300 transition-colors'>
                                Home
                            </Link>
                            <a href='#reviews' onClick={scrollToReviews} className='whitespace-nowrap hover:text-cyan-300 transition-colors cursor-pointer'>
                                Reviews
                            </a>
                            <Link href='/contact' className='whitespace-nowrap hover:text-cyan-300 transition-colors'>
                                Contact
                            </Link>
                            <Link href='/about' className='whitespace-nowrap hover:text-cyan-300 transition-colors'>
                                About us
                            </Link>
                            <Link href='/privacy-policy' className='whitespace-nowrap hover:text-cyan-300 transition-colors'>
                                Privacy Policy
                            </Link>
                            <Link href='/delete-data' className='whitespace-nowrap hover:text-cyan-300 transition-colors'>
                                Delete Data
                            </Link>
                        </div>
                        
                        {/* Desktop Store Icons */}
                        <div className='flex items-center gap-2'>
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition hover:scale-105'
                            >
                                <img 
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                    alt="Get it on Google Play"
                                    className="h-14 w-auto"
                                />
                            </a>
                            <a
                                href={APP_LINKS.APP_STORE}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition hover:scale-105'
                            >
                                <img 
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                    alt="Download on the App Store"
                                    className="h-10 w-auto"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='p-2 text-white md:hidden'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label='Toggle menu'
                    >
                        {isMenuOpen ? (
                            <svg className='h-8 w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        ) : (
                            <svg className='h-8 w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className='absolute top-20 right-0 left-0 border-t border-white/10 bg-[#0C4C55] p-4 shadow-xl md:hidden'>
                    <div className='flex flex-col space-y-4 text-center text-lg font-medium text-white'>
                        <Link 
                            href='/' 
                            className='py-2 hover:bg-white/10 hover:text-cyan-300 rounded-lg'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <a 
                            href='#reviews' 
                            onClick={scrollToReviews} 
                            className='py-2 hover:bg-white/10 hover:text-cyan-300 rounded-lg cursor-pointer'
                        >
                            Reviews
                        </a>
                        <Link 
                            href='/contact' 
                            className='py-2 hover:bg-white/10 hover:text-cyan-300 rounded-lg'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link 
                            href='/about' 
                            className='py-2 hover:bg-white/10 hover:text-cyan-300 rounded-lg'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About us
                        </Link>
                        <Link 
                            href='/privacy-policy' 
                            className='py-2 hover:bg-white/10 hover:text-cyan-300 rounded-lg'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            href='/delete-data' 
                            className='py-2 hover:bg-white/10 hover:text-cyan-300 rounded-lg'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Delete Data
                        </Link>
                        
                        {/* Mobile Store Icons */}
                        <div className='mt-4 flex justify-center gap-4 pt-4 border-t border-white/10'>
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <img 
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                    alt="Get it on Google Play"
                                    className="h-14 w-auto"
                                />
                            </a>
                            <a
                                href={APP_LINKS.APP_STORE}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <img 
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                    alt="Download on the App Store"
                                    className="h-10 w-auto"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
