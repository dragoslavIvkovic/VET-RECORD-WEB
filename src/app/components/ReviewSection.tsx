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
            id: 'review-alex',
            name: 'AlexRisitic',
            avatar: '/images/review_alex.png',
            text: 'Excellent app. I no longer have to call my vet to remember my dog’s medical history.'
        },
        {
            id: 'review-aimin',
            name: 'Aimin',
            avatar: '/images/review_aimin.png',
            text: 'This app has made managing my pet\'s care so much simpler. Thank you'
        },
        {
            id: 'review-ferwelo',
            name: 'Ferwelo, Nikko D.',
            avatar: '/images/review_ferwelo.png',
            text: 'My pet will like this'
        },
        {
            id: 'review-zhanarys',
            name: 'Zhanarys Dakhiyev',
            avatar: '/images/review_zhanarys.png',
            text: 'Simple, effective and working. Nice 👍'
        },
        {
            id: 'review-fes',
            name: 'fes62627',
            avatar: '/images/review_fes.png',
            text: 'Better than pen and paper'
        }
    ];

    const StarIcon = () => (
        <svg className='h-4 w-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
    );

    return (
        <section id='reviews' className='bg-gray-50 py-16'>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-[#0C4C55] px-4 py-1 text-sm text-white'>
                        Reviews
                    </span>
                    <h2 className='text-3xl font-bold md:text-4xl'>
                        What our <span className='text-[#0C4C55]'>customers say</span>
                    </h2>
                    <div className='mt-4 flex items-center justify-center gap-2'>
                        <div className='flex'>
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={`rating-${i}`} />
                            ))}
                        </div>
                        <span className='font-semibold'>5.0/5.0</span>
                        <span className='text-gray-500'>• 1399 reviews</span>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-5'>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className='rounded-2xl bg-white p-6 shadow-md transition-all hover:shadow-xl'>
                            {/* Stars */}
                            <div className='mb-4 flex'>
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={`${review.id}-star-${i}`} />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className='mb-6 leading-relaxed text-gray-700'>&ldquo;{review.text}&rdquo;</p>

                            {/* Author */}
                            <div className='flex items-center gap-3'>
                                <img
                                    src={review.avatar}
                                    alt={`${review.name} - Vet Record App User Review`}
                                    className='h-10 w-10 rounded-full object-cover'
                                />
                                <span className='font-semibold text-gray-900'>{review.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className='mt-12 text-center'>
                    <h3 className='text-xl font-bold text-[#0C4C55]'>Safe, Secure, and Loved by Pet Parents</h3>
                </div>
            </div>
        </section>
    );
}
