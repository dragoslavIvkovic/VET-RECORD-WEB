'use client';

export default function About() {
    return (
        <main className='flex min-h-screen flex-col items-center'>
            {/* Hero Section */}
            <section className='from-primary to-primary/90 w-full bg-gradient-to-b py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm'>About us</span>
                    <h1 className='font-bebas mb-6 text-4xl font-bold text-white md:text-5xl'>
                        Managing Pet Health Records <br />
                        <span className='text-accent-cyan'>Made Simple and Smart</span>
                    </h1>
                    <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-300'>
                        VET RECORD is dedicated to revolutionizing how pet owners manage their pets' health information,
                        making it easier to track vaccinations, medications, and medical history.
                    </p>
                </div>
            </section>

            {/* Statistics Section */}
            <section className='bg-surface w-full py-16'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {[
                            { id: 'countries', number: '150+', label: 'Countries' },
                            { id: 'reviews', number: '2300+', label: 'Reviews' },
                            { id: 'followers', number: '8M+', label: 'Followers' }
                        ].map((stat) => (
                            <div
                                key={stat.id}
                                className='rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:scale-105'>
                                <p className='text-primary mb-2 text-3xl font-bold'>{stat.number}</p>
                                <p className='text-text-secondary'>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='bg-surface-white w-full py-16'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-primary mb-12 text-center text-3xl font-bold'>Why Choose VET RECORD</h2>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {[
                            {
                                id: 'user-friendly',
                                title: 'User Friendly',
                                description: 'Intuitive interface designed for easy navigation and quick data entry'
                            },
                            {
                                id: 'comprehensive',
                                title: 'Comprehensive Tracking',
                                description: 'Track vaccinations, medications, weight, and all important health records'
                            },
                            {
                                id: 'secure',
                                title: 'Secure Storage',
                                description:
                                    "Your pet's health data is securely stored and easily accessible when needed"
                            }
                        ].map((feature) => (
                            <div
                                key={feature.id}
                                className='rounded-xl bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105'>
                                <h3 className='text-primary mb-4 text-xl font-semibold'>{feature.title}</h3>
                                <p className='text-text-secondary'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='from-primary to-primary/90 w-full bg-gradient-to-t py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='mb-6 text-3xl font-bold text-white'>Ready to Get Started?</h2>
                    <p className='mb-8 text-gray-300'>
                        Download VET RECORD today and take control of your pet's health records
                    </p>
                    <a
                        href='https://play.google.com/store/apps/details?id=vetrecord.app'
                        className='text-primary rounded-full bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Download Now
                    </a>
                </div>
            </section>
        </main>
    );
}
