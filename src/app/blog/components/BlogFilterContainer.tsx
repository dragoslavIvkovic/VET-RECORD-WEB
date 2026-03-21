'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import BlogPostLink from '../BlogPostLink';
import type { BlogPostMeta } from '@/lib/blog';

interface Props {
    posts: BlogPostMeta[];
}

const CATEGORIES = [
    { id: 'all', label: 'All Posts', keywords: [] },
    { id: 'dog', label: 'Dogs 🐕', keywords: ['dog', 'puppy', 'canine', 'psi', 'pas', 'štene'] },
    { id: 'cat', label: 'Cats 🐈', keywords: ['cat', 'kitten', 'feline', 'mačke', 'mačka', 'mače'] },
    { id: 'vet', label: 'Veterinarian 🩺', keywords: ['vet', 'health', 'vaccin', 'medic', 'disease', 'illness', 'vakcina', 'zdrav'] },
    { id: 'tips', label: 'Tips & Care 💡', keywords: ['tip', 'guide', 'how', 'care', 'training', 'nutrition', 'food', 'savet', 'nega', 'hrana'] },
];

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function readTime(text: string): string {
    if (!text) return '5 min read';
    const mins = Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
    return `${mins} min read`;
}

export default function BlogFilterContainer({ posts }: Props) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'all') return posts;
        const category = CATEGORIES.find((c) => c.id === activeCategory);
        if (!category) return posts;

        return posts.filter((post) => {
            const content = `${post.title} ${post.description} ${post.meta_title || ''} ${post.meta_description || ''}`.toLowerCase();
            return category.keywords.some((kw) => content.includes(kw));
        });
    }, [posts, activeCategory]);

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setVisibleCount(6); // Reset pagination on category change
    };

    const featured = filteredPosts[0];
    const rest = filteredPosts.slice(1);
    const visibleRest = rest.slice(0, visibleCount);

    return (
        <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
            {/* Filter Header */}
            <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <h2 className='text-2xl font-bold text-gray-900'>Discover Articles</h2>
                
                {/* Horizontal Scrollable Filter Buttons */}
                <div className='flex w-full sm:w-auto overflow-x-auto pb-2 snap-x hide-scrollbar scroll-smooth'>
                    <div className='flex items-center gap-2 px-1'>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`snap-start shrink-0 rounded-full px-5 py-2.5 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0C4C55] ${
                                    activeCategory === cat.id
                                        ? 'bg-[#0C4C55] text-white shadow-md'
                                        : 'bg-white text-gray-600 shadow-sm border border-gray-200 hover:border-[#0C4C55]/40 hover:bg-[#F3F5FF] hover:text-[#0C4C55]'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {!featured && (
                <div className='py-20 text-center rounded-3xl border border-gray-100 bg-white shadow-sm'>
                    <p className='text-5xl mb-4'>📭</p>
                    <h3 className='text-xl font-bold text-gray-900'>No posts found</h3>
                    <p className='text-gray-500 mt-2'>We couldn&apos;t find any articles for this category.</p>
                    <button 
                        onClick={() => handleCategoryChange('all')} 
                        className='mt-6 rounded-full bg-[#0C4C55]/10 px-6 py-2.5 text-sm font-semibold text-[#0C4C55] transition-colors hover:bg-[#0C4C55]/20'>
                        View all posts
                    </button>
                </div>
            )}

            {/* FEATURED POST */}
            {featured && (
                <BlogPostLink
                    href={`/blog/${featured.slug}`}
                    slug={featured.slug}
                    title={featured.title}
                    className='group mb-12 block'>
                    <article className='overflow-hidden rounded-3xl bg-white shadow ring-1 ring-gray-200 transition-all hover:shadow-xl hover:-translate-y-1 duration-300'>
                        {/* Image area: full cover image */}
                        <div className='relative aspect-video w-full overflow-hidden bg-[#0C4C55]/5 sm:aspect-[2.5/1]'>
                            {featured.image ? (
                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className='absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-[1.05]'
                                />
                            ) : (
                                <div className='flex h-full w-full items-center justify-center bg-linear-to-b from-[#d6eef1] to-[#bde1e6]'>
                                    <span className='text-7xl opacity-20'>🐾</span>
                                </div>
                            )}
                        </div>

                        {/* Text */}
                        <div className='p-6 sm:p-8'>
                            <div className='mb-4 flex flex-wrap items-center gap-3'>
                                <span className='rounded-full bg-[#0C4C55]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#0C4C55] uppercase'>
                                    Featured
                                </span>
                                <span className='text-sm font-medium text-gray-400'>
                                    {formatDate(featured.date)}
                                </span>
                                <span className='text-gray-300'>•</span>
                                <span className='text-sm font-medium text-gray-400'>
                                    {readTime(featured.description)}
                                </span>
                            </div>

                            <h2 className='mb-3 text-2xl leading-tight font-bold text-gray-900 transition-colors group-hover:text-[#0C4C55] sm:text-3xl md:text-4xl'>
                                {featured.title}
                            </h2>

                            {featured.description && (
                                <p className='mb-6 max-w-3xl text-base leading-relaxed text-gray-500 sm:text-lg'>
                                    {featured.description}
                                </p>
                            )}

                            <div className='flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6'>
                                {featured.author ? (
                                    <div className='flex items-center gap-3'>
                                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#0C4C55] to-[#126b78] shadow-sm text-sm font-bold text-white'>
                                            {featured.author.charAt(0).toUpperCase()}
                                        </div>
                                        <span className='text-sm font-bold text-gray-700'>{featured.author}</span>
                                    </div>
                                ) : (
                                    <span />
                                )}

                                <span className='inline-flex items-center gap-2 rounded-full bg-[#0C4C55] px-5 py-2.5 text-sm font-bold text-white transition-transform duration-300 group-hover:bg-[#0f5c66]'>
                                    Read article
                                    <svg
                                        className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2.5}
                                            d='M17 8l4 4m0 0l-4 4m4-4H3'
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </article>
                </BlogPostLink>
            )}

            {/* MORE ARTICLES GRID */}
            {rest.length > 0 && (
                <>
                    <h2 className='mb-6 text-sm font-bold tracking-widest text-[#0C4C55] uppercase border-b border-gray-200 pb-3'>
                        More in {CATEGORIES.find(c => c.id === activeCategory)?.label?.split(' ')[0] || 'Articles'}
                    </h2>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {visibleRest.map((post) => (
                            <BlogPostLink
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                slug={post.slug}
                                title={post.title}
                                className='group flex h-full'
                                prefetch={false}>
                                <article className='flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#0C4C55]/20'>
                                    {/* Image — cover */}
                                    <div className='relative aspect-4/3 w-full overflow-hidden bg-gray-50'>
                                        {post.image ? (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className='absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-[1.05]'
                                            />
                                        ) : (
                                            <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-[#d6eef1] to-[#bde1e6]'>
                                                <span className='text-5xl opacity-20 transform transition-transform group-hover:scale-110 duration-500'>🐾</span>
                                            </div>
                                        )}
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Text */}
                                    <div className='flex flex-1 flex-col p-5 sm:p-6'>
                                        <div className='mb-3 flex items-center justify-between text-xs font-medium text-gray-400'>
                                            <span>{formatDate(post.date)}</span>
                                            <span className='flex items-center gap-1'>
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {readTime(post.description)}
                                            </span>
                                        </div>

                                        <h3 className='mb-3 text-lg leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#0C4C55] line-clamp-2'>
                                            {post.title}
                                        </h3>

                                        {post.description && (
                                            <p className='mb-5 line-clamp-3 text-sm leading-relaxed text-gray-500'>
                                                {post.description}
                                            </p>
                                        )}

                                        <div className='mt-auto flex items-center justify-between border-t border-gray-50 pt-4'>
                                            {post.author ? (
                                                <div className='flex items-center gap-2'>
                                                    <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[#0C4C55]/10 text-xs font-bold text-[#0C4C55]'>
                                                        {post.author.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className='text-xs font-semibold text-gray-500 truncate max-w-[100px]'>{post.author}</span>
                                                </div>
                                            ) : (
                                                <span />
                                            )}
                                            <span className='inline-flex items-center gap-1 text-sm font-bold text-[#C43C1D] transition-transform group-hover:translate-x-1'>
                                                Read
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </BlogPostLink>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {visibleCount < rest.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 6)}
                                className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:border-[#0C4C55]/30 hover:bg-[#F3F5FF] hover:text-[#0C4C55] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0C4C55]/50 focus:ring-offset-2"
                            >
                                <span>Load More Articles</span>
                                <svg 
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </>
            )}
            
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
