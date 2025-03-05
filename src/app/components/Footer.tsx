'use client';

import { useState } from 'react';

export default function Footer() {
    const [formStatus, setFormStatus] = useState({
        loading: false,
        success: false,
        error: null as string | null
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Sačuvaj trenutnu poziciju skrola
        const scrollPosition = window.scrollY;

        setFormStatus({ loading: true, success: false, error: null });

        const form = e.currentTarget;
        const nameInput = form.elements.namedItem('name') as HTMLInputElement;
        const emailInput = form.elements.namedItem('email') as HTMLInputElement;
        const subjectInput = form.elements.namedItem('subject') as HTMLInputElement;
        const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement;

        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value,
            newsletter: false
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An error occurred while sending your message.');
            }

            setFormStatus({ loading: false, success: true, error: null });
            form.reset();

            // Vrati na sačuvanu poziciju skrola
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        } catch (error: unknown) {
            console.error('Error:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setFormStatus({ loading: false, success: false, error: errorMessage });

            // Vrati na sačuvanu poziciju skrola
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        }
    };

    return (
        <footer className='bg-[#0C4C55] text-white'>
            <div className='relative'>
                <div className='container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='flex justify-center'>
                        {/* Contact Form Section - Now centered and with adjusted width */}
                        <div className='w-full max-w-2xl space-y-6'>
                            <div className='text-center'>
                                <p className='text-sm tracking-[0.20em] text-red-500 uppercase'>CONTACT US</p>
                                <h2 className='mt-2 text-3xl font-bold'>Get in touch !</h2>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-4'
                                action='javascript:void(0);'
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.stopPropagation();
                                    }
                                }}
                                onMouseDown={(e) => e.stopPropagation()}>
                                {formStatus.success && (
                                    <div className='mb-4 rounded-lg bg-green-100 p-4 text-center text-sm text-green-800'>
                                        Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                {formStatus.error && (
                                    <div className='mb-4 rounded-lg bg-red-100 p-4 text-center text-sm text-red-800'>
                                        {formStatus.error}
                                    </div>
                                )}

                                <div className='grid gap-4 md:grid-cols-2'>
                                    <div>
                                        <label htmlFor='name' className='mb-2 block text-center text-sm'>
                                            Your Name:
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            placeholder='Name :'
                                            required
                                            className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-center text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor='email' className='mb-2 block text-center text-sm'>
                                            Your Email:
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            placeholder='Email :'
                                            required
                                            className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-center text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='subject' className='mb-2 block text-center text-sm'>
                                        Your Question:
                                    </label>
                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        placeholder='Subject :'
                                        className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-center text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='message' className='mb-2 block text-center text-sm'>
                                        Your Comment:
                                    </label>
                                    <textarea
                                        id='message'
                                        name='message'
                                        rows={4}
                                        placeholder='Message :'
                                        required
                                        className='w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-center text-white placeholder-white/50 focus:border-white/40 focus:outline-none'
                                    />
                                </div>

                                <div className='flex justify-center'>
                                    <button
                                        type='submit'
                                        disabled={formStatus.loading}
                                        className={`rounded-lg bg-red-500 px-8 py-3 text-white transition-colors hover:bg-red-600 ${
                                            formStatus.loading ? 'cursor-not-allowed opacity-70' : ''
                                        }`}>
                                        {formStatus.loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom - Now fully centered */}
            <div className='bg-black py-4'>
                <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col items-center space-y-4'>
                        <div className='text-center'>
                            <p>© Copyrights 2024. All rights reserved.</p>
                        </div>
                        <ul className='flex flex-wrap justify-center gap-6'>
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
