'use client';

export default function PrivacyPolicy() {
    return (
        <main className='flex min-h-screen flex-col items-center p-8 md:p-24'>
            <div className='bg-surface-white text-primary w-full max-w-4xl rounded-lg p-8 shadow-xl'>
                <h1 className='font-display mb-2 text-4xl font-bold'>Privacy Policy</h1>
                <p className='text-text-secondary mb-8'>Last updated: February 11, 2025</p>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Introduction</h2>
                    <p className='text-text-secondary mb-4 leading-relaxed'>
                        VET RECORD ("we," "our," "us," or "the Company") values and protects your privacy. This Privacy
                        Policy explains how we collect, use, and safeguard your information when you use our mobile
                        application (the "Service").
                    </p>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Contact Information</h2>
                    <p className='text-text-secondary mb-4'>
                        For any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul className='bg-surface text-text-secondary space-y-2 rounded-lg p-4'>
                        <li className='flex items-center'>
                            <span className='mr-2'>📧</span>
                            Email: ivkemilioner2@gmail.com
                        </li>
                        <li className='flex items-center'>
                            <span className='mr-2'>🏢</span>
                            Company: VET RECORD
                        </li>
                        <li className='flex items-center'>
                            <span className='mr-2'>📍</span>
                            Location: Serbia
                        </li>
                    </ul>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Data Collection and Usage</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <h3 className='mb-4 text-xl font-medium'>Data We Collect</h3>
                        <p className='text-text-secondary mb-4'>
                            Our app collects and processes the following types of information:
                        </p>
                        <ul className='text-text-secondary list-inside list-disc space-y-2'>
                            <li>Usage data (for app improvement and analytics)</li>
                            <li>Device information (for app functionality and security)</li>
                            <li>Pet health records (when you input them)</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Data Security</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>
                            We implement industry-standard security measures to protect your data:
                        </p>
                        <ul className='text-text-secondary list-inside list-disc space-y-2'>
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments</li>
                            <li>Secure data storage practices</li>
                            <li>Access controls and authentication</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Third-Party Services</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>We use the following third-party services:</p>
                        <ul className='text-text-secondary list-inside list-disc space-y-2'>
                            <li>Google Play Services</li>
                            <li>Firebase Analytics</li>
                            <li>Crash reporting services</li>
                        </ul>
                        <p className='text-text-secondary mt-4'>
                            All third-party providers are required to protect your data and comply with privacy laws.
                        </p>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Your Privacy Rights</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <p className='text-text-secondary mb-4'>You have the right to:</p>
                        <ul className='text-text-secondary list-inside list-disc space-y-2'>
                            <li>Access your data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to data processing</li>
                            <li>Data portability</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Updates to Privacy Policy</h2>
                    <p className='text-text-secondary'>
                        We may update this Privacy Policy periodically. The "Last updated" date at the top of this page
                        will reflect any changes.
                    </p>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Compliance</h2>
                    <p className='text-text-secondary'>
                        We comply with applicable data protection laws, including Google Play's User Data policy and
                        local privacy regulations.
                    </p>
                </section>
            </div>
        </main>
    );
}
