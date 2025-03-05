'use client';

export default function Footer() {
    return (
        <footer className='bg-[#0C4C55] text-white'>
            <div className='relative'>
                <div className='container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='grid gap-12 md:grid-cols-2'>
                        {/* Left Column - Contact Form */}
                        <div className='relative'>
                            <img
                                src='/images/contact-illustration.svg'
                                alt='Contact Illustration'
                                className='w-full max-w-md'
                            />
                        </div>

                        {/* Right Column - Contact Form */}
                        <div className='space-y-6'>
                            <div>
                                <p className='text-sm tracking-[0.20em] text-red-500 uppercase'>CONTACT US</p>
                                <h2 className='mt-2 text-3xl font-bold'>Get in touch !</h2>
                            </div>

                            <form className='space-y-4'>
                                <div className='grid gap-4 md:grid-cols-2'>
                                    <div>
                                        <label htmlFor='name' className='mb-2 block text-sm'>
                                            Your Name:
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            placeholder='Name :'
                                            className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='email' className='mb-2 block text-sm'>
                                            Your Email:
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            placeholder='Email :'
                                            className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='subject' className='mb-2 block text-sm'>
                                        Your Question:
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        placeholder='Subject :'
                                        className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='message' className='mb-2 block text-sm'>
                                        Your Comment:
                                    </label>
                                    <textarea
                                        id='message'
                                        rows={4}
                                        placeholder='Message :'
                                        className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className='rounded-lg bg-red-500 px-8 py-3 text-white transition-colors hover:bg-red-600'>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Download App Section */}
                    <div className='mt-16 text-center'>
                        <h2 className='mb-6 text-2xl font-bold'>Download app</h2>
                        <a
                            href='https://play.google.com/store/apps/details?id=vetrecord.app'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-block rounded-full bg-white p-4 shadow-md transition-colors hover:bg-gray-100'>
                            <img
                                alt='Download on Google Play'
                                className='h-14'
                                src='/images/googleplay_dark.png'
                                loading='lazy'
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='bg-black py-4'>
                <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
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
