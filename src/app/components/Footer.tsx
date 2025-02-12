'use client';

export default function Footer() {
    return (
        <footer className='bg-[#0C4C55] text-white'>
            <div className='relative'>
                <div className='container mx-auto px-4 py-16'>
                    <div className='grid gap-12 md:grid-cols-2'>
                        {/* Left Column */}
                        <div>
                            <div className='space-y-8'>
                                {/* Logo */}
                                <div>
                                    <a href='/' aria-label='Return to homepage'>
                                        <img src='/logo.svg' alt='Vet Record Logo' className='h-8 w-auto' />
                                    </a>
                                </div>

                                {/* Newsletter */}
                                <div className='space-y-4'>
                                    <h2 className='text-2xl font-bold text-white'>Subscribe to our newsletter</h2>
                                    <p className='text-gray-300'>
                                        Get the latest updates and news directly in your inbox
                                    </p>
                                    <form className='space-y-4'>
                                        <div className='relative'>
                                            <label htmlFor='newsletter-email' className='sr-only'>
                                                Email address
                                            </label>
                                            <input
                                                id='newsletter-email'
                                                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 focus:outline-none'
                                                placeholder='Enter your email address'
                                                type='email'
                                                required
                                            />
                                            <button
                                                type='submit'
                                                className='absolute top-1/2 right-2 -translate-y-1/2 transform rounded-lg bg-cyan-500 px-4 py-2 text-white transition-colors hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:outline-none'
                                                aria-label='Subscribe to newsletter'>
                                                Subscribe
                                            </button>
                                        </div>
                                        <p className='text-sm text-gray-400'>
                                            We respect your privacy. Unsubscribe at any time.
                                        </p>
                                    </form>
                                </div>

                                {/* Contact Info */}
                                <ul className='space-y-2'>
                                    <li>
                                        <a href='/contact' className='hover:text-[#FF5733]'>
                                            Kontaktirajte nas
                                        </a>
                                    </li>
                                    <li>
                                        <a href='tel:+19001234567' className='hover:text-[#FF5733]'>
                                            +1-900-123 4567
                                        </a>
                                    </li>
                                </ul>

                                {/* Social Media */}
                                <ul className='flex space-x-4'>
                                    <li>
                                        <a
                                            href='https://x.com/PurrFacts_'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='hover:text-[#FF5733]'
                                            aria-label='Follow us on X (Twitter)'>
                                            𝕏
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='https://www.facebook.com/share/g/15TtxmFQt4/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='hover:text-[#FF5733]'
                                            aria-label='Visit our Facebook page'>
                                            f
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='https://www.pinterest.com/dragoslavmivkovic/pet/'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='hover:text-[#FF5733]'
                                            aria-label='Follow us on Pinterest'>
                                            P
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='flex flex-col justify-center'>
                            <div className='space-y-6'>
                                <h2 className='text-2xl font-bold'>Download app</h2>
                                <a
                                    href='https://play.google.com/store/apps/details?id=vetrecord.app'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-block'>
                                    <img
                                        alt='Download on Google Play'
                                        className='h-16'
                                        src='/images/googleplay.png'
                                        loading='lazy'
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='bg-black py-4'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
                        <div>
                            <p>© Copyrights 2024. All rights reserved.</p>
                        </div>
                        <ul className='flex flex-wrap gap-6'>
                            <li>
                                <a href='/' className='hover:text-[#FF5733]'>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href='/about' className='hover:text-[#FF5733]'>
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href='/privacy-policy' className='hover:text-[#FF5733]'>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href='/contact' className='hover:text-[#FF5733]'>
                                    Contact us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
