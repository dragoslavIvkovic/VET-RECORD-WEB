'use client';

import { useEffect, useState } from 'react';

interface Review {
    name: string;
    role: string;
    avatar: string;
    text: string;
    id: string;
}

export default function ReviewSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const reviews: Review[] = [
        {
            id: 'review1',
            name: 'Calvin Carlo',
            role: 'Manager',
            avatar: '/images/review1.png',
            text: 'It seems that only fragments of the original text remain in the Lorem Ipsum texts used today.'
        },
        {
            id: 'review2',
            name: 'Christa Smith',
            role: 'Manager',
            avatar: '/images/review2.png',
            text: 'The most well-known dummy text is the Lorem Ipsum, which is said to have originated in the 16th century.'
        },
        {
            id: 'review3',
            name: 'Jemina CLone',
            role: 'Manager',
            avatar: '/images/review3.png',
            text: 'One disadvantage of Lorem Ipsum is that in Latin certain letters appear more frequently than others.'
        },
        {
            id: 'review4',
            name: 'Michael Chen',
            role: 'Manager',
            avatar: '/images/review1.png',
            text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.'
        },
        {
            id: 'review5',
            name: 'Sarah Johnson',
            role: 'Manager',
            avatar: '/images/review2.png',
            text: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.'
        },
        {
            id: 'review6',
            name: 'David Wilson',
            role: 'Manager',
            avatar: '/images/review3.png',
            text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.'
        },
        {
            id: 'review7',
            name: 'Emma Davis',
            role: 'Manager',
            avatar: '/images/review1.png',
            text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.'
        },
        {
            id: 'review8',
            name: 'James Miller',
            role: 'Manager',
            avatar: '/images/review2.png',
            text: 'If you are going to use a passage of Lorem Ipsum, you need to be sure there is nothing embarrassing.'
        },
        {
            id: 'review9',
            name: 'Sofia Garcia',
            role: 'Manager',
            avatar: '/images/review3.png',
            text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in classical literature.'
        }
    ];

    const totalSlides = Math.ceil(reviews.length / 3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 2000);

        return () => clearInterval(timer);
    }, [totalSlides]);

    const StarIcon = () => (
        <svg className='h-5 w-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true' role='img'>
            <title>Star Rating</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
    );

    const QuoteIcon = () => (
        <svg className='h-8 w-8 text-red-500' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true' role='img'>
            <title>Quote</title>
            <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
        </svg>
    );

    return (
        <section className='bg-white py-20'>
            <div className='container mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center'>
                    <span className='text-sm font-semibold tracking-wider text-red-500 uppercase'>REVIEWS</span>
                    <h2 className='mt-2 text-4xl font-bold text-gray-900'>10k+ Customers Trust Us</h2>
                    <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-500'>
                        Unleash the power of our platform with a multitude of powerful features, empowering you to
                        achieve your goals.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className='mt-16'>
                    <div className='relative overflow-hidden'>
                        <div
                            className='flex transition-transform duration-500 ease-in-out'
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`
                            }}>
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={`slide-${slideIndex}`} className='w-full flex-none'>
                                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                                        {reviews.slice(slideIndex * 3, slideIndex * 3 + 3).map((review) => (
                                            <div
                                                key={review.id}
                                                className='flex flex-col rounded-lg bg-white p-8 shadow-lg'>
                                                <QuoteIcon />
                                                <p className='mt-4 flex-grow text-lg text-gray-500'>{review.text}</p>
                                                <div className='mt-4 flex justify-center'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon key={`${review.id}-star-${i}`} />
                                                    ))}
                                                </div>
                                                <div className='mt-6 flex flex-col items-center'>
                                                    <img
                                                        className='h-12 w-12 rounded-full object-cover'
                                                        src={review.avatar}
                                                        alt={review.name}
                                                    />
                                                    <div className='mt-2 text-center'>
                                                        <h3 className='font-medium text-gray-900'>{review.name}</h3>
                                                        <p className='text-gray-500'>{review.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Dots */}
                        <div className='mt-8 flex justify-center space-x-2'>
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={`nav-${index}`}
                                    type='button'
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 w-2 rounded-full transition-colors ${
                                        currentSlide === index ? 'bg-red-500' : 'bg-gray-300'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
