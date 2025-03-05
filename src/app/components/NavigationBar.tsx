'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useTheme } from '../providers/ThemeProvider';

export default function NavigationBar() {
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const scrollToReviews = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (pathname !== '/') {
            router.push('/', { scroll: false });
            // Sačekamo malo da se stranica učita pre skrolovanja
            setTimeout(() => {
                const reviewsSection = document.querySelector('#reviews');
                if (reviewsSection) {
                    reviewsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Ako smo već na home stranici, samo skrolujemo
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
            <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='w-[200px]'>
                        <Link href='/' className='flex items-center'>
                            <img src='/logo.svg' alt='Vet Record Logo' className='h-14 w-auto' />
                        </Link>
                    </div>

                    <div className='hidden space-x-8 md:flex'>
                        <Link href='/' className='text-white hover:text-cyan-300'>
                            Home
                        </Link>
                        <a href='#reviews' onClick={scrollToReviews} className='text-white hover:text-cyan-300'>
                            Reviews
                        </a>
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
                    </div>

                    <div>
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
                </div>
            </div>
        </nav>
    );
}
