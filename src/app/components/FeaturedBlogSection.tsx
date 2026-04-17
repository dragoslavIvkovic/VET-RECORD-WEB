import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, type BlogPostMeta } from '@/lib/blog';

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
        ? ''
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function estimateReadTime(description: string): string {
    const words = description.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 50)); // description is a short excerpt
    return `${minutes} min read`;
}

export default async function FeaturedBlogSection() {
    let posts: BlogPostMeta[] = [];

    try {
        const all = await getBlogPosts();
        posts = all.slice(0, 3);
    } catch {
        return null; // Silently skip if Ghost is unavailable
    }

    if (posts.length === 0) return null;

    return (
        <section className='bg-white py-16 sm:py-20' aria-labelledby='featured-blog-heading'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>

                {/* Header */}
                <div className='mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
                    <div>
                        {/* Eyebrow */}
                        <span className='mb-3 inline-flex items-center gap-2 rounded-full bg-[#0C4C55]/10 px-4 py-1.5 text-sm font-semibold text-[#0C4C55]'>
                            <span className='h-1.5 w-1.5 rounded-full bg-[#0C4C55]' />
                            From the Blog
                        </span>
                        <h2
                            id='featured-blog-heading'
                            className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'
                        >
                            Pet Health Tips & Guides
                        </h2>
                        <p className='mt-2 max-w-xl text-base text-gray-500'>
                            Expert advice on vaccinations, nutrition, and care for your dogs and cats.
                        </p>
                    </div>
                    <Link
                        href='/blog'
                        className='group shrink-0 inline-flex items-center gap-2 rounded-full border border-[#0C4C55]/30 px-5 py-2.5 text-sm font-semibold text-[#0C4C55] transition-all hover:bg-[#0C4C55] hover:text-white'
                    >
                        View all posts
                        <svg
                            className='h-4 w-4 transition-transform group-hover:translate-x-1'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </Link>
                </div>

                {/* Cards grid */}
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className='group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#0C4C55]/20'
                        >
                            {/* Cover image */}
                            <div className='relative aspect-[16/9] overflow-hidden bg-[#0C4C55]/5'>
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                                        quality={75}
                                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                                        priority={index === 0}
                                    />
                                ) : (
                                    // Placeholder when no image
                                    <div className='flex h-full items-center justify-center bg-gradient-to-br from-[#0C4C55] to-[#0a3d44]'>
                                        <span className='text-5xl opacity-40'>🐾</span>
                                    </div>
                                )}
                                {/* Gradient overlay */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                            </div>

                            {/* Content */}
                            <div className='flex flex-1 flex-col p-5'>
                                {/* Meta */}
                                <div className='mb-3 flex items-center gap-3 text-xs text-gray-400'>
                                    {post.date && (
                                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                                    )}
                                    {post.date && post.description && (
                                        <span className='text-gray-200'>·</span>
                                    )}
                                    {post.description && (
                                        <span>{estimateReadTime(post.description)}</span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className='mb-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#0C4C55] line-clamp-2'>
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                {post.description && (
                                    <p className='mb-4 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-3'>
                                        {post.description}
                                    </p>
                                )}

                                {/* Read more */}
                                <span className='mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C4C55]'>
                                    Read article
                                    <svg
                                        className='h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        aria-hidden
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
