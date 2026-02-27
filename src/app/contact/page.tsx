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
            <section className='w-full bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm text-white'>
                        Contact us
                    </span>
                    <h1 className='mb-6 text-4xl font-bold text-white md:text-5xl'>
                        Any query? <span className='text-cyan-300'>Let&apos;s talk</span>
                    </h1>
                    <p className='mx-auto mb-12 max-w-2xl text-lg text-gray-300'>
                        We&apos;re here to help with any questions about the VET RECORD app
                    </p>

                    <div className='flex justify-center'>
                        <a
                            href='mailto:support@vetrecord.app'
                            className='flex flex-col items-center rounded-xl bg-white/10 p-8 backdrop-blur-sm transition hover:bg-white/15'>
                            <div className='mb-4 text-cyan-300'>
                                <svg className='h-12 w-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                    />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-white'>Email us</h3>
                            <span className='text-lg text-gray-300 hover:text-cyan-300'>support@vetrecord.app</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
