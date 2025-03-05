'use client';

export default function DeleteData() {
    return (
        <main className='flex min-h-screen flex-col items-center p-8 md:p-24'>
            <div className='bg-surface-white text-primary w-full max-w-4xl rounded-lg p-8 shadow-xl'>
                <h1 className='font-bebas mb-8 text-4xl font-bold'>Data Deletion Request - VET RECORD</h1>

                <section className='mb-12'>
                    <h2 className='mb-6 text-2xl font-semibold'>How to Delete Your Data</h2>

                    <div className='bg-surface mb-8 rounded-lg p-6'>
                        <h3 className='mb-4 text-xl font-semibold'>Option 1: In-App Deletion (Recommended)</h3>
                        <ol className='text-text-secondary list-decimal space-y-3 pl-6'>
                            <li className='leading-relaxed'>Open the VET RECORD app</li>
                            <li className='leading-relaxed'>Go to Settings</li>
                            <li className='leading-relaxed'>Select "Delete Data"</li>
                            <li className='leading-relaxed'>Confirm your choice</li>
                        </ol>
                    </div>

                    <div className='bg-surface rounded-lg p-6'>
                        <h3 className='mb-4 text-xl font-semibold'>Option 2: Email Request</h3>
                        <p className='text-text-secondary mb-4'>
                            If you cannot access the app, email us at{' '}
                            <span className='text-accent-cyan font-medium'>ivkemilioner2@gmail.com</span> with:
                        </p>
                        <ul className='text-text-secondary list-disc space-y-3 pl-6'>
                            <li className='leading-relaxed'>Subject line: "Data Deletion Request - VET RECORD"</li>
                            <li className='leading-relaxed'>Your device ID</li>
                            <li className='leading-relaxed'>The approximate date you started using the app</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>What Gets Deleted</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <ul className='text-text-secondary list-disc space-y-3 pl-6'>
                            <li className='leading-relaxed'>All pet health records</li>
                            <li className='leading-relaxed'>Usage data</li>
                            <li className='leading-relaxed'>Device information</li>
                        </ul>
                    </div>
                </section>

                <section className='mb-12'>
                    <h2 className='mb-4 text-2xl font-semibold'>Retention Period</h2>
                    <div className='bg-surface rounded-lg p-6'>
                        <ul className='text-text-secondary list-disc space-y-3 pl-6'>
                            <li className='leading-relaxed'>We will process your request within 30 days</li>
                            <li className='leading-relaxed'>Some data may be retained for legal compliance</li>
                            <li className='leading-relaxed'>Inactive data is automatically deleted after 90 days</li>
                        </ul>
                    </div>
                </section>

                <div className='bg-surface mt-8 rounded-lg p-6'>
                    <p className='text-text-secondary text-sm'>
                        Note: Once your data is deleted, this action cannot be undone. Please make sure you have backed
                        up any important information before proceeding with the deletion request.
                    </p>
                </div>
            </div>
        </main>
    );
}
