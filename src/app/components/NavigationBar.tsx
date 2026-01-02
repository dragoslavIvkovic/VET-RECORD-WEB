'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { APP_LINKS } from '../constants/app-links';

export default function NavigationBar() {
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
        <nav className='fixed top-0 right-0 left-0 z-50 border-b border-white bg-[#0C4C55]'>
            <div className='container mx-auto px-4'>
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

                    <div className='flex items-center gap-2'>
                        <a
                            href={APP_LINKS.GOOGLE_PLAY}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition hover:opacity-80'
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
                            className='transition hover:opacity-80'
                        >
                            <img 
                                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1502323200" 
                                alt="Download on the App Store"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
