'use client';

export default function TermsOfService() {
    return (
        <main className='flex min-h-screen flex-col items-center p-8 md:p-24'>
            <div className='bg-surface-white text-primary w-full max-w-4xl rounded-lg p-8 shadow-xl'>
                <h1 className='font-bebas mb-8 text-4xl font-bold'>Terms of Service - VET RECORD</h1>
                <p className='text-text-secondary mb-4 text-sm'>Last updated: March 15, 2024</p>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>1. Acceptance of Terms</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            By downloading, installing, or using VET RECORD ("the App"), you agree to be bound by these
                            Terms of Service. If you do not agree to these terms, please do not use the App.
                        </p>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>2. Description of Service</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            VET RECORD is a mobile application designed to help pet owners manage their pets' health
                            records. The App allows users to:
                        </p>
                        <ul className='text-text-secondary list-disc space-y-3 pl-6'>
                            <li className='leading-relaxed'>Store and manage pet health records</li>
                            <li className='leading-relaxed'>Track vaccinations and medications</li>
                            <li className='leading-relaxed'>Set reminders for veterinary appointments</li>
                            <li className='leading-relaxed'>Share pet health information with veterinarians</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>3. User Responsibilities</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>You agree to:</p>
                        <ul className='text-text-secondary list-disc space-y-3 pl-6'>
                            <li className='leading-relaxed'>Provide accurate and complete information</li>
                            <li className='leading-relaxed'>Maintain the security of your account</li>
                            <li className='leading-relaxed'>Not use the App for any illegal purposes</li>
                            <li className='leading-relaxed'>Not interfere with the App's functionality</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>4. Privacy and Data Protection</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            Your privacy is important to us. Our collection and use of your data is governed by our
                            Privacy Policy, which you can find at{' '}
                            <a href='/privacy-policy' className='text-accent-cyan hover:underline'>
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>5. Intellectual Property</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            All content and functionality in the App is the exclusive property of VET RECORD and is
                            protected by copyright and other intellectual property laws.
                        </p>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>6. Limitation of Liability</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            VET RECORD is provided "as is" without any warranties. We are not responsible for any
                            damages arising from the use of the App.
                        </p>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>7. Changes to Terms</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            We reserve the right to modify these terms at any time. Continued use of the App after
                            changes constitutes acceptance of the new terms.
                        </p>
                    </div>
                </section>

                <div className='bg-surface mt-8 rounded-lg p-6'>
                    <p className='text-text-secondary text-sm'>
                        For questions about these Terms of Service, please contact us at{' '}
                        <span className='text-accent-cyan'>ivkemilioner2@gmail.com</span>
                    </p>
                </div>
            </div>
        </main>
    );
}
