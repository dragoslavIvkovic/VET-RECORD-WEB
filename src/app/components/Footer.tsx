'use client';

import Link from 'next/link';

import { APP_LINKS } from '../config/links';

export default function Footer() {
    return (
        <footer className='bg-[#0C4C55] text-white'>
            {/* Main Footer */}
            <div className='container mx-auto px-4 py-8'>
                <div className='flex flex-col items-end gap-4 md:flex-row md:items-center md:justify-end'>
                    {/* Newsletter */}
                    <div className='flex items-center gap-4'>
                        <div className='text-right'>
                            <h3 className='font-bold'>Subscribe newsletter</h3>
                            <p className='text-sm text-gray-300'>Be the first to receive updates</p>
                        </div>
                        <div className='relative'>
                            <input
                                className='w-56 rounded-lg bg-white px-4 py-2 pr-10 text-sm text-black'
                                placeholder='Enter your email'
                                type='email'
                                required
                            />
                            <button
                                type='submit'
                                className='absolute top-1/2 right-2 -translate-y-1/2 font-bold text-[#0C4C55]'
                                aria-label='Subscribe'>
                                →
                            </button>
                        </div>
                    </div>

                    {/* Download Icons */}
                    <div className='flex items-center gap-3'>
                        <a href={APP_LINKS.GOOGLE_PLAY} target='_blank' rel='noopener noreferrer' className='transition hover:opacity-80'>
                            <img src='/images/download/googleplay.png' alt='Get it on Google Play' className='h-11' />
                        </a>
                        <a href={APP_LINKS.APP_STORE} target='_blank' rel='noopener noreferrer' className='transition hover:opacity-80'>
                            <img src='/images/download/appstore.png' alt='Download on the App Store' className='h-11' />
                        </a>
                    </div>

                    {/* Pinterest Icon */}
                    <a
                        href='https://www.pinterest.com/dragoslavmivkovic/pet/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0C4C55] transition hover:opacity-80'
                        aria-label='Follow us on Pinterest'>
                        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' />
                        </svg>
                    </a>

                    {/* Product Hunt Badges */}
                    <div className='flex items-center gap-4'>
                        {/* iOS Badge */}
                        <a
                            href='https://www.producthunt.com/products/vet-record-pet-health-tracker-ios?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-vet-record-pet-health-tracker-ios'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition hover:opacity-80'>
                            <img
                                src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1061325&theme=light&t=1768317449825'
                                alt='Vet Record – Pet Health Tracker (iOS) - Pets,Health,Mobile Apps | Product Hunt'
                                width='250'
                                height='54'
                            />
                        </a>

                        {/* Product Hunt Card */}
                        <div
                            className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'
                            style={{ maxWidth: '500px' }}>
                            <div className='mb-3 flex items-center gap-3'>
                                <img
                                    alt='Vet Record'
                                    src='https://ph-files.imgix.net/16784a05-4461-48bd-9a78-222bb6425604.png?auto=format&fit=crop&w=80&h=80'
                                    className='h-16 w-16 flex-shrink-0 rounded-lg object-cover'
                                />
                                <div className='min-w-0 flex-1'>
                                    <h3 className='m-0 truncate text-lg leading-tight font-semibold text-gray-900'>
                                        Vet Record
                                    </h3>
                                    <p className='mt-1 line-clamp-2 text-sm leading-snug text-gray-500'>
                                        Ultimate pet health app - meds, vaccines, reminders &amp; more
                                    </p>
                                </div>
                            </div>
                            <a
                                href='https://www.producthunt.com/products/vet-record?embed=true&utm_source=embed&utm_medium=post_embed'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mt-3 inline-flex items-center gap-1 rounded-lg bg-[#FF6154] px-4 py-2 text-sm font-semibold text-white no-underline transition hover:opacity-90'>
                                Check it out on Product Hunt →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='border-t border-white/20 py-3'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-wrap items-center justify-between gap-4 text-sm text-gray-300'>
                        <p>© {new Date().getFullYear()} Vet Record. All rights reserved.</p>
                        <ul className='flex flex-wrap gap-4'>
                            <li>
                                <Link href='/' className='hover:text-white'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href='/blog' className='hover:text-white'>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href='/calculator' className='hover:text-white'>
                                    Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href='/about' className='hover:text-white'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href='/privacy-policy' className='hover:text-white'>
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href='/contact' className='hover:text-white'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
