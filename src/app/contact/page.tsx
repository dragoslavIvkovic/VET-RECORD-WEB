'use client';

import { useEffect, useState } from 'react';

interface FormStatus {
    loading: boolean;
    message: string;
    error: boolean;
    details?: {
        success?: boolean;
        messageId?: string;
        error?: string;
    };
}

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: false
    });
    const [status, setStatus] = useState<FormStatus>({
        loading: false,
        message: '',
        error: false
    });

    // Add class to body element when on contact page
    useEffect(() => {
        document.body.classList.add('contact-page');

        return () => {
            document.body.classList.remove('contact-page');
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Save current scroll position
        const scrollPosition = window.scrollY;

        try {
            setStatus({ loading: true, message: 'Sending message...', error: false });

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                newsletter: false
            });

            setStatus({
                loading: false,
                message: 'Message sent successfully! We will contact you soon.',
                error: false
            });

            // Return to saved scroll position
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({
                loading: false,
                message: 'Failed to send message. Please try again or contact us directly at ivkemilioner2@gmail.com',
                error: true
            });

            // Return to saved scroll position
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        }
    };

    return (
        <main className='flex min-h-screen flex-col items-center'>
            {/* Hero Section */}
            <section className='from-primary to-primary/90 w-full bg-gradient-to-b py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm'>Contact Us</span>
                    <h1 className='mb-6 text-4xl font-bold text-white md:text-5xl'>
                        Have a Question? <span className='text-accent-cyan'>Let's Talk</span>
                    </h1>
                    <p className='mx-auto mb-12 max-w-2xl text-lg text-gray-300'>
                        We're here to help with any questions about VET RECORD. Get in touch with us!
                    </p>

                    <div className='mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {/* Email Card */}
                        <div className='rounded-xl bg-white/10 p-6 backdrop-blur-sm'>
                            <div className='text-accent-cyan mb-4'>
                                <svg
                                    className='mx-auto h-8 w-8'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    role='img'
                                    aria-label='Email'>
                                    <title>Email</title>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                    />
                                </svg>
                            </div>
                            <h3 className='mb-2 text-xl font-semibold text-white'>Email Us</h3>
                            <a href='mailto:ivkemilioner2@gmail.com' className='hover:text-accent-cyan text-gray-300'>
                                ivkemilioner2@gmail.com
                            </a>
                        </div>

                        {/* Location Card */}
                        <div className='rounded-xl bg-white/10 p-6 backdrop-blur-sm'>
                            <div className='text-accent-cyan mb-4'>
                                <svg
                                    className='mx-auto h-8 w-8'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    role='img'
                                    aria-label='Location'>
                                    <title>Location</title>
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
                            <div className='text-accent-cyan mb-4'>
                                <svg
                                    className='mx-auto h-8 w-8'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    role='img'
                                    aria-label='Support'>
                                    <title>Support</title>
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
            <section className='bg-surface w-full py-16'>
                <div className='container mx-auto px-4'>
                    <div className='mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-xl'>
                        <h2 className='text-primary mb-8 text-center text-3xl font-bold'>Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className='space-y-6' action='javascript:void(0);'>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                <div>
                                    <input
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Your Name'
                                        className='focus:border-accent-cyan w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none'
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Your Email'
                                        className='focus:border-accent-cyan w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none'
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type='text'
                                    name='subject'
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder='Subject (Optional)'
                                    className='focus:border-accent-cyan w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none'
                                />
                            </div>

                            <div>
                                <textarea
                                    name='message'
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder='Your Message'
                                    className='focus:border-accent-cyan w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none'
                                    required
                                />
                            </div>

                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    id='newsletter'
                                    name='newsletter'
                                    checked={formData.newsletter}
                                    onChange={handleChange}
                                    className='mr-2'
                                />
                                <label htmlFor='newsletter' className='text-text-secondary text-sm'>
                                    I would like to receive updates and news about VET RECORD
                                </label>
                            </div>

                            {/* Status Message */}
                            {status.message && (
                                <div
                                    id='status-message'
                                    className={`rounded-lg p-4 text-center ${
                                        status.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                    <p className='text-lg font-medium'>{status.message}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className='text-center'>
                                <button
                                    type='submit'
                                    disabled={status.loading}
                                    className={`bg-primary rounded-full px-8 py-3 text-white transition-colors ${
                                        status.loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary/90'
                                    }`}>
                                    {status.loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
