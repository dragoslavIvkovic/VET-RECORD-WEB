import type { Metadata } from 'next';

import { ContactDownloadButtons, ContactEmailButton } from './ContactActions';

export const metadata: Metadata = {
    title: 'What is Vet Record? Your New Pet Health Record App',
    description:
        "Vet Record is the easiest way to organize your pet's medical history. Store vet records for dogs and cats securely with our top-rated pet records app.",
    alternates: {
        canonical: '/contact'
    }
};

export default function Contact() {
    return (
        <main className='flex min-h-screen flex-col items-center bg-[#0C4C55]'>
            <section className='relative w-full overflow-hidden bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-16 md:py-24'>
                {/* Background decorative elements */}
                <div className='pointer-events-none absolute inset-0 overflow-hidden'>
                    <div className='absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-cyan-400/10 blur-3xl' />
                    <div className='absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-teal-400/10 blur-3xl delay-1000' />
                </div>

                <div className='relative z-10 container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-cyan-300 ring-1 ring-white/20 backdrop-blur-md'>
                        Contact Us
                    </span>
                    <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl'>
                        We&apos;re Here to <span className='text-cyan-400'>Help</span>
                    </h1>
                    <p className='mx-auto mb-16 max-w-2xl text-lg text-gray-300 md:text-xl'>
                        Have questions, feedback, or need support with the{' '}
                        <strong className='text-white'>Vet Record</strong> app? Our team is always ready to assist you
                        and your furry friends.
                    </p>

                    <div className='mx-auto flex max-w-5xl flex-col items-stretch justify-center gap-6 md:flex-row md:gap-8'>
                        {/* Download App Promo Card */}
                        <div className='group flex w-full flex-1 flex-col items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-cyan-500/20 md:p-10'>
                            <div className='flex w-full flex-col items-center'>
                                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 transition-transform group-hover:scale-110'>
                                    <svg
                                        className='h-8 w-8'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                                        />
                                    </svg>
                                </div>
                                <h2 className='mb-4 text-3xl font-bold text-white'>Get the App</h2>
                                <p className='mb-8 text-center leading-relaxed text-gray-300'>
                                    Track your pet&apos;s vaccines, weight, and medications easily. Download{' '}
                                    <strong className='text-cyan-300'>Vet Record</strong>, the ultimate pet health
                                    tracker, and keep your dog or cat&apos;s medical history right in your pocket.
                                </p>
                            </div>
                            <ContactDownloadButtons />
                        </div>

                        {/* Direct Contact Card */}
                        <div className='group flex w-full flex-1 flex-col items-center justify-between rounded-3xl border border-cyan-500/20 bg-linear-to-br from-cyan-600/20 to-teal-600/20 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-cyan-600/30 hover:shadow-cyan-500/30 md:p-10'>
                            <div className='flex w-full flex-col items-center'>
                                <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-110'>
                                    <svg className='h-8 w-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                        />
                                    </svg>
                                </div>
                                <h2 className='mb-4 text-3xl font-bold text-white'>Email Us</h2>
                                <p className='mb-8 text-center leading-relaxed text-gray-300'>
                                    Prefer to write? Send us an email anytime and our dedicated support team will get
                                    back to you as soon as possible to answer any of your questions.
                                </p>
                            </div>
                            <ContactEmailButton />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
