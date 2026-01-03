'use client';

import Link from 'next/link';
import { APP_LINKS } from '../constants/app-links';

export default function Footer() {
    return (
        <footer className='bg-[#0C4C55] text-white'>
            <div className='container mx-auto px-4 py-10'>
                <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
                    {/* Left - Logo & Newsletter */}
                    <div className='flex-1 space-y-4'>
                        <Link href='/' aria-label='Return to homepage'>
                            <img src='/logo.svg' alt='Vet Record Logo' className='h-10 w-auto' />
                        </Link>

                        <div className='space-y-2'>
                            <h2 className='text-lg font-bold'>Subscribe newsletter</h2>
                            <p className='text-sm text-gray-300'>Be the first to receive all latest post in your inbox</p>
                            <form>
                                <div className='relative max-w-sm'>
                                    <input
                                        className='w-full rounded-lg bg-white px-4 py-2 pr-10 text-sm text-black'
                                        placeholder='Enter your email'
                                        type='email'
                                        required
                                    />
                                    <button
                                        type='submit'
                                        className='absolute top-1/2 right-2 -translate-y-1/2 text-[#0C4C55]'
                                        aria-label='Subscribe'>
                                        →
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right - Download */}
                    <div className='space-y-3'>
                        <h2 className='text-lg font-bold'>Download App</h2>
                        <div className='flex items-center gap-3'>
                            <a
                                href={APP_LINKS.GOOGLE_PLAY}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex h-10 items-center rounded-lg bg-black px-3 transition hover:opacity-80'
                            >
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                                    alt="Get it on Google Play"
                                    className="h-6"
                                />
                            </a>
                            <a
                                href={APP_LINKS.APP_STORE}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex h-10 items-center rounded-lg bg-black px-3 transition hover:opacity-80'
                            >
                                <img 
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                                    alt="Download on the App Store"
                                    className="h-6"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='border-t border-white/20 py-4'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col items-center justify-between gap-3 text-sm md:flex-row'>
                        <p className='text-gray-400'>© {new Date().getFullYear()} Vet Record. All rights reserved.</p>
                        <ul className='flex flex-wrap gap-4 text-gray-300'>
                            <li><Link href='/' className='hover:text-white transition'>Home</Link></li>
                            <li><Link href='/about' className='hover:text-white transition'>About</Link></li>
                            <li><Link href='/privacy-policy' className='hover:text-white transition'>Privacy</Link></li>
                            <li><Link href='/contact' className='hover:text-white transition'>Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
