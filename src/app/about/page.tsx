'use client';

export default function About() {
    return (
        <main className='flex min-h-screen flex-col items-center'>
            {/* Hero Section */}
            <section className='w-full py-16 bg-linear-to-b from-[#0C4C55] to-[#0a3d44]'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm'>About us</span>
                    <h1 className='mb-6 text-4xl font-bold text-white md:text-5xl'>
                        Managing Pet Health Records <br />
                        <span className='text-cyan-300'>Made Simple and Smart</span>
                    </h1>
                    <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-300'>
                        VET RECORD is dedicated to revolutionizing how pet owners manage their pets' health information,
                        making it easier to track vaccinations, medications, and medical history.
                    </p>
                </div>
            </section>

            {/* Statistics Section */}
            <section className='w-full py-16 bg-[#F3F5FF]'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {[
                            { number: '150+', label: 'Countries' },
                            { number: '2300+', label: 'Reviews' },
                            { number: '8M+', label: 'Followers' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className='rounded-xl bg-white p-8 text-center shadow-lg transition-transform hover:scale-105'>
                                <p className='mb-2 text-3xl font-bold text-[#0C4C55]'>
                                    {stat.number}
                                </p>
                                <p className='text-gray-600'>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='w-full py-16 bg-white'>
                <div className='container mx-auto px-4'>
                    <h2 className='mb-12 text-center text-3xl font-bold text-[#0C4C55]'>
                        Why Choose VET RECORD
                    </h2>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {[
                            {
                                title: 'User Friendly',
                                description: 'Intuitive interface designed for easy navigation and quick data entry'
                            },
                            {
                                title: 'Comprehensive Tracking',
                                description: 'Track vaccinations, medications, weight, and all important health records'
                            },
                            {
                                title: 'Secure Storage',
                                description: "Your pet's health data is securely stored and easily accessible when needed"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className='rounded-xl bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105'>
                                <h3 className='mb-4 text-xl font-semibold text-[#0C4C55]'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='w-full py-16 bg-linear-to-t from-[#0C4C55] to-[#0a3d44]'>
                <div className='container mx-auto px-4 text-center'>
                    <h2 className='mb-6 text-3xl font-bold text-white'>Ready to Get Started?</h2>
                    <p className='mb-8 text-gray-300'>
                        Download VET RECORD today and take control of your pet's health records
                    </p>
                    <a
                        href='https://play.google.com/store/apps/details?id=vetrecord.app'
                        className='rounded-full bg-white px-8 py-3 font-semibold text-[#0C4C55] transition-colors hover:bg-gray-100'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Download Now
                    </a>
                </div>
            </section>
        </main>
    );
}
