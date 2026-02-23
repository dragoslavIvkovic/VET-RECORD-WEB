import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Vet Record',
    description:
        'Read the Vet Record Privacy Policy. Learn how we collect, use, and protect your personal information.',
    alternates: {
        canonical: '/privacy-policy'
    }
};

export default function PrivacyPolicy() {
    return (
        <main className='flex min-h-screen flex-col items-center p-8 md:p-24'>
            <div className='w-full max-w-4xl rounded-lg bg-white p-8 text-[#0C4C55] shadow-xl'>
                <h1 className='mb-2 text-4xl font-bold'>Privacy Policy</h1>
                <p className='mb-8 text-gray-500'>Last updated: February 11, 2025</p>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Introduction</h2>
                    <p className='mb-4 leading-relaxed text-gray-700'>
                        VET RECORD ("we," "our," "us," or "the Company") values and protects your privacy. This Privacy
                        Policy explains how we collect, use, and safeguard your information when you use our mobile
                        application (the "Service").
                    </p>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Contact Information</h2>
                    <p className='mb-4 text-gray-700'>
                        For any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul className='space-y-2 rounded-lg bg-gray-50 p-4 text-gray-700'>
                        <li className='flex items-center'>
                            <span className='mr-2'>📧</span>
                            Email: support@vetrecord.app
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
                    <div className='rounded-lg bg-gray-50 p-6'>
                        <h3 className='mb-4 text-xl font-medium'>Data We Collect</h3>
                        <p className='mb-4 text-gray-700'>
                            Our app collects and processes the following types of information:
                        </p>
                        <ul className='list-inside list-disc space-y-2 text-gray-700'>
                            <li>Usage data (for app improvement and analytics)</li>
                            <li>Device information (for app functionality and security)</li>
                            <li>Pet health records (when you input them)</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Data Security</h2>
                    <div className='rounded-lg bg-gray-50 p-6'>
                        <p className='mb-4 text-gray-700'>
                            We implement industry-standard security measures to protect your data:
                        </p>
                        <ul className='list-inside list-disc space-y-2 text-gray-700'>
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments</li>
                            <li>Secure data storage practices</li>
                            <li>Access controls and authentication</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Third-Party Services</h2>
                    <div className='rounded-lg bg-gray-50 p-6'>
                        <p className='mb-4 text-gray-700'>We use the following third-party services:</p>
                        <ul className='list-inside list-disc space-y-2 text-gray-700'>
                            <li>Google Play Services</li>
                            <li>Firebase Analytics</li>
                            <li>Crash reporting services</li>
                        </ul>
                        <p className='mt-4 text-gray-700'>
                            All third-party providers are required to protect your data and comply with privacy laws.
                        </p>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Your Privacy Rights</h2>
                    <div className='rounded-lg bg-gray-50 p-6'>
                        <p className='mb-4 text-gray-700'>You have the right to:</p>
                        <ul className='list-inside list-disc space-y-2 text-gray-700'>
                            <li>Access your data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to data processing</li>
                            <li>Data portability</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Updates to Privacy Policy</h2>
                    <p className='text-gray-700'>
                        We may update this Privacy Policy periodically. The "Last updated" date at the top of this page
                        will reflect any changes.
                    </p>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Compliance</h2>
                    <p className='text-gray-700'>
                        We comply with applicable data protection laws, including Google Play's User Data policy and
                        local privacy regulations.
                    </p>
                </section>
            </div>
        </main>
    );
}
