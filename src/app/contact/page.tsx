import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - Vet Record',
    description:
        'Get in touch with the Vet Record team. We are here to help with any questions about our pet health tracking app.',
    alternates: {
        canonical: '/contact'
    }
};

export default function Contact() {
    return (
        <main className='flex min-h-screen flex-col items-center'>
            {/* Hero Section */}
            <section className='w-full bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm'>Contact us</span>
                    <h1 className='mb-6 text-4xl font-bold text-white md:text-5xl'>
                        Any query? <span className='text-cyan-300'>Let's talk</span>
                    </h1>
                    <p className='mx-auto mb-12 max-w-2xl text-lg text-gray-300'>
                        We're here to help with any questions about the VET RECORD app
                    </p>

                    <div className='mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {/* Email Card */}
                        <div className='rounded-xl bg-white/10 p-6 backdrop-blur-sm'>
                            <div className='mb-4 text-cyan-300'>
                                <svg className='mx-auto h-8 w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                    />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-white'>Email us</h3>
                            <a href='mailto:support@vetrecord.app' className='text-gray-300 hover:text-cyan-300'>
                                support@vetrecord.app
                            </a>
                        </div>

                        {/* Location Card */}
                        <div className='rounded-xl bg-white/10 p-6 backdrop-blur-sm'>
                            <div className='mb-4 text-cyan-300'>
                                <svg className='mx-auto h-8 w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                                    />
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-white'>Location</h3>
                            <p className='text-gray-300'>Serbia</p>
                        </div>

                        {/* Support Card */}
                        <div className='rounded-xl bg-white/10 p-6 backdrop-blur-sm'>
                            <div className='mb-4 text-cyan-300'>
                                <svg className='mx-auto h-8 w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-white'>Support</h3>
                            <p className='text-gray-300'>24/7 Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className='w-full bg-[#F3F5FF] py-16'>
                <div className='container mx-auto px-4'>
                    <div className='mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-xl'>
                        <h2 className='mb-8 text-center text-3xl font-bold text-[#0C4C55]'>Drop us a message</h2>
                        <form className='space-y-6'>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <div>
                                    <input
                                        type='text'
                                        placeholder='Your name'
                                        className='w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-cyan-300 focus:outline-none'
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type='email'
                                        placeholder='Your email'
                                        className='w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-cyan-300 focus:outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type='text'
                                    placeholder='Subject'
                                    className='w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-cyan-300 focus:outline-none'
                                />
                            </div>

                            <div>
                                <textarea
                                    rows={6}
                                    placeholder='Your message'
                                    className='w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-cyan-300 focus:outline-none'
                                    required
                                />
                            </div>

                            <div className='flex items-center'>
                                <input type='checkbox' id='newsletter' className='mr-2' />
                                <label htmlFor='newsletter' className='text-sm text-gray-600'>
                                    I agree to receive emails, newsletters and promotional messages
                                </label>
                            </div>

                            <div className='text-center'>
                                <button
                                    type='submit'
                                    className='rounded-full bg-[#0C4C55] px-8 py-3 text-white transition-colors hover:opacity-90'>
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
