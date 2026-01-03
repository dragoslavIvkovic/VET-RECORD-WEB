'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { APP_LINKS } from '../constants/app-links';

export default function NavigationBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('reviews');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-[#0C4C55] shadow-lg py-2' : 'bg-[#0C4C55] py-4'
            }`}
        >
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <Link href='/' className='flex-shrink-0' onClick={() => setIsMobileMenuOpen(false)}>
                        <img src='/logo.svg' alt='Vet Record Logo' className='h-10 w-auto md:h-12' />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center space-x-8'>
                        <div className='flex items-center space-x-6 text-white font-medium text-base whitespace-nowrap'>
                            <Link href='/' className='hover:text-cyan-300 transition-colors'>
                                Home
                            </Link>
                            <a href='#reviews' onClick={scrollToReviews} className='hover:text-cyan-300 transition-colors cursor-pointer'>
                                Reviews
                            </a>
                            <Link href='/contact' className='hover:text-cyan-300 transition-colors'>
                                Contact
                            </Link>
                            <Link href='/about' className='hover:text-cyan-300 transition-colors'>
                                About us
                            </Link>
                            <Link href='/privacy-policy' className='hover:text-cyan-300 transition-colors'>
                                Privacy Policy
                            </Link>
                            <Link href='/delete-data' className='hover:text-cyan-300 transition-colors'>
                                Delete Data
                            </Link>
                        </div>

                        {/* Store Badges - Desktop */}
                        <div className='flex items-center space-x-3'>
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition hover:opacity-80'
                            >
                                <img 
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                    alt="Get it on Google Play"
                                    className="h-10 w-auto"
                                />
                            </a>
                            <a
                                href={APP_LINKS.APP_STORE}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition hover:opacity-80'
                            >
                                <img 
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                    alt="Download on the App Store"
                                    className="h-7 w-auto"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors'
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label='Toggle menu'
                    >
                        <svg
                            className='h-6 w-6'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            {isMobileMenuOpen ? (
                                <path d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path d='M4 6h16M4 12h16M4 18h16' />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className='flex flex-col space-y-4 pb-4 border-t border-white/10 pt-4'>
                        <Link 
                            href='/' 
                            className='text-white hover:text-cyan-300 font-medium px-2'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <a 
                            href='#reviews' 
                            onClick={scrollToReviews} 
                            className='text-white hover:text-cyan-300 font-medium px-2 cursor-pointer'
                        >
                            Reviews
                        </a>
                        <Link 
                            href='/contact' 
                            className='text-white hover:text-cyan-300 font-medium px-2'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link 
                            href='/about' 
                            className='text-white hover:text-cyan-300 font-medium px-2'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About us
                        </Link>
                        <Link 
                            href='/privacy-policy' 
                            className='text-white hover:text-cyan-300 font-medium px-2'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Privacy Policy
                        </Link>
                        <Link 
                            href='/delete-data' 
                            className='text-white hover:text-cyan-300 font-medium px-2'
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Delete Data
                        </Link>
                        
                        {/* Store Badges - Mobile */}
                        <div className='flex items-center gap-3 pt-2 px-2'>
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition hover:opacity-80'
                            >
                                <img 
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                    alt="Get it on Google Play"
                                    className="h-10 w-auto"
                                />
                            </a>
                            <a
                                href={APP_LINKS.APP_STORE}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='transition hover:opacity-80'
                            >
                                <img 
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                    alt="Download on the App Store"
                                    className="h-7 w-auto"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
