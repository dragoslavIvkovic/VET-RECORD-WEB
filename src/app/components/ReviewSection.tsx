'use client';

interface Review {
    name: string;
    avatar: string;
    text: string;
    id: string;
}

export default function ReviewSection() {
    const reviews: Review[] = [
        {
            id: 'review1',
            name: 'Aimin',
            avatar: '/images/review1.png',
            text: "This app has made managing my pet's care so much simpler.Thank you"
        },
        {
            id: 'review2',
            name: 'Ferwelo, Nikko D',
            avatar: '/images/review2.png',
            text: 'My pet will like this'
        },
        {
            id: 'review3',
            name: 'Anonymous',
            avatar: '/images/review3.png',
            text: 'Simple, effective and working. Nice 👍'
        }
    ];

    const StarIcon = ({ index }: { index: number }) => (
        <svg className='h-5 w-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true' role='img'>
            <title>{`Star rating ${index + 1}`}</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
    );

    return (
        <section id='reviews' className='bg-white py-20'>
            <div className='container mx-auto px-4'>
                <div className='grid gap-12 md:grid-cols-2'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                        <span className='rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white'>Reviews</span>
                        <h2 className='text-4xl font-bold'>
                            Positive reviews <br />
                            <span className='text-[#FF5733]'>of our clients</span>
                        </h2>

                        <div className='flex items-center space-x-2'>
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={`rating-star-${i}`} index={i} />
                            ))}
                            <span className='text-gray-600'>4.5/5.0</span>
                        </div>

                        <div className='flex items-center'>
                            <span>Rated on</span>
                            <img src='/images/google.png' alt='Google Rating' className='ml-2 h-8' />
                        </div>

                        <div className='text-lg'>
                            <span className='font-bold'>1399</span>
                            <a href='/reviews' className='ml-2 text-[#FF5733] hover:underline'>
                                Total user reviews →
                            </a>
                        </div>

                        <img src='/images/smily.png' alt='Smiley face icon' className='w-24' />
                    </div>

                    {/* Right Column - Reviews */}
                    <div className='space-y-6'>
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className='rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105'>
                                <div className='mb-4 flex items-center space-x-4'>
                                    <img
                                        src={review.avatar}
                                        alt={`${review.name}'s avatar`}
                                        className='h-12 w-12 rounded-full'
                                    />
                                    <div>
                                        <h3 className='font-semibold'>{review.name}</h3>
                                        <div className='flex'>
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon key={`${review.id}-star-${i}`} index={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className='text-gray-600'>{review.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
