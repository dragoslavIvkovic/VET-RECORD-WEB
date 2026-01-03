'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { APP_LINKS } from '../constants/app-links';

export default function NavigationBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
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

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '#reviews', label: 'Reviews', onClick: scrollToReviews },
        { href: '/contact', label: 'Contact' },
        { href: '/about', label: 'About' },
        { href: '/privacy-policy', label: 'Privacy' },
    ];

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 bg-[#0C4C55]'>
            <div className='container mx-auto px-4'>
                <div className='flex h-16 items-center justify-between'>
                    {/* Logo */}
                    <Link href='/' className='shrink-0'>
                        <img src='/logo.svg' alt='Vet Record' className='h-10 w-auto' />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden lg:flex items-center gap-6'>
                        {navLinks.map((link) => (
                            link.onClick ? (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={link.onClick}
                                    className='text-white hover:text-cyan-300 whitespace-nowrap'
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className='text-white hover:text-cyan-300 whitespace-nowrap'
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Store Icons - Desktop */}
                    <div className='hidden md:flex items-center gap-2'>
                        <a
                            href={APP_LINKS.GOOGLE_PLAY}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition hover:opacity-80'
                        >
                            <img 
                                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                alt="Google Play"
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
                                alt="App Store"
                                className="h-7 w-auto"
                            />
                        </a>
                    </div>

                    {/* Hamburger Menu Button - Mobile */}
                    <button
                        type='button'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='lg:hidden p-2 text-white'
                        aria-label='Toggle menu'
                    >
                        <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            {isMenuOpen ? (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='lg:hidden bg-[#0C4C55] border-t border-white/20'>
                    <div className='container mx-auto px-4 py-4'>
                        <div className='flex flex-col gap-4'>
                            {navLinks.map((link) => (
                                link.onClick ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={link.onClick}
                                        className='text-white hover:text-cyan-300 text-lg'
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className='text-white hover:text-cyan-300 text-lg'
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            
                            {/* Store Icons - Mobile */}
                            <div className='flex items-center gap-3 pt-4 border-t border-white/20'>
                                <a
                                    href={APP_LINKS.GOOGLE_PLAY}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <img 
                                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                                        alt="Google Play"
                                        className="h-12 w-auto"
                                    />
                                </a>
                                <a
                                    href={APP_LINKS.APP_STORE}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    <img 
                                        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                        alt="App Store"
                                        className="h-9 w-auto"
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
