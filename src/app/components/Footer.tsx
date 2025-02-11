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
                                    <h2 className='text-2xl font-bold'>Subscribe newsletter</h2>
                                    <p>Be the first to receive all latest post in your inbox</p>
                                    <form className='space-y-4'>
                                        <div className='relative'>
                                            <label htmlFor='newsletter-email' className='sr-only'>
                                                Email address
                                            </label>
                                            <input
                                                id='newsletter-email'
                                                className='w-full rounded-lg bg-white px-4 py-2 text-black'
                                                placeholder='Enter your email'
                                                type='email'
                                                required
                                            />
                                            <button
                                                type='submit'
                                                className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-[#0C4C55] p-2 text-white'
                                                aria-label='Subscribe to newsletter'>
                                                →
                                            </button>
                                        </div>
                                        <p className='text-sm text-gray-400'>
                                            By clicking send link you agree to receive message.
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
