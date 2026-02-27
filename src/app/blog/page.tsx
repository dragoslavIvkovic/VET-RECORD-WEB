import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Pet health tips, vaccination guides, and care advice from Vet Record.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Blog | Vet Record – Pet Health Tips & Guides',
        description: 'Pet health tips, vaccination guides, and care advice.',
        url: 'https://www.vetrecord.app/blog',
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Vet Record – Pet Health Tips & Guides',
        description: 'Pet health tips, vaccination guides, and care advice for dogs and cats.'
    },
    keywords: ['pet health blog', 'dog care tips', 'cat health', 'vaccination guide', 'pet care advice']
};

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
        ? ''
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function readTime(text: string): string {
    const mins = Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
    return `${mins} min read`;
}

export default async function BlogPage() {
    let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
    let error: string | null = null;

    try {
        posts = await getBlogPosts();
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load blog posts';
    }

    const [featured, ...rest] = posts;

    return (
        <main className='min-h-screen bg-gray-50'>

            {/* ── PAGE HEADER ───────────────────────────────────────── */}
            <section className='relative overflow-hidden bg-[#0C4C55] py-16'>
                <div className='pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5' />
                <div className='pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-cyan-400/10' />
                <div className='container relative mx-auto px-4 text-center'>
                    <span className='mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-cyan-200'>
                        <span className='h-1.5 w-1.5 rounded-full bg-cyan-400' />
                        Vet Record Blog
                    </span>
                    <h1 className='mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
                        Pet Health Tips &amp; Guides
                    </h1>
                    <p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-teal-100/80'>
                        Expert advice on vaccinations, nutrition, and care for your dogs and cats.
                    </p>
                </div>
            </section>

            <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>

                {/* ── ERROR ─────────────────────────────────────────── */}
                {error && (
                    <div className='mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center'>
                        <p className='font-semibold text-amber-900'>{error}</p>
                        <p className='mt-1 text-sm text-amber-700'>Check BLOG_GITHUB_REPO_URL in your environment.</p>
                    </div>
                )}

                {/* ── EMPTY ─────────────────────────────────────────── */}
                {!error && posts.length === 0 && (
                    <div className='mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-14 text-center shadow-sm'>
                        <p className='text-4xl'>🐾</p>
                        <p className='mt-4 text-lg font-semibold text-gray-800'>No posts yet</p>
                        <p className='mt-1 text-sm text-gray-500'>Add markdown files to your GitHub repo.</p>
                    </div>
                )}

                {/* ── FEATURED ──────────────────────────────────────── */}
                {!error && featured && (
                    <Link href={`/blog/${featured.slug}`} className='group mb-10 block'>
                        <article className='overflow-hidden rounded-3xl bg-white shadow ring-1 ring-gray-200 transition-shadow hover:shadow-lg'>
                            
                            {/* Image area: full cover image */}
                            <div className='relative w-full aspect-2/1 overflow-hidden bg-gray-100 sm:aspect-[2.5/1]'>
                                {featured.image ? (
                                    <img
                                        src={featured.image}
                                        alt={featured.title}
                                        className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                                    />
                                ) : (
                                    <div className='flex h-full w-full items-center justify-center bg-linear-to-b from-[#d6eef1] to-[#bde1e6]'>
                                        <span className='text-7xl opacity-20'>🐾</span>
                                    </div>
                                )}
                            </div>

                            {/* Text */}
                            <div className='p-6 sm:p-8'>
                                <div className='mb-3 flex flex-wrap items-center gap-2'>
                                    <span className='rounded-full bg-[#0C4C55]/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#0C4C55]'>
                                        Featured
                                    </span>
                                    <span className='text-xs text-gray-400'>
                                        {formatDate(featured.date)}
                                        {featured.description ? ` · ${readTime(featured.description)}` : ''}
                                    </span>
                                </div>

                                <h2 className='mb-3 text-2xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#0C4C55] sm:text-3xl'>
                                    {featured.title}
                                </h2>

                                {featured.description && (
                                    <p className='mb-5 max-w-2xl text-base leading-relaxed text-gray-500'>
                                        {featured.description}
                                    </p>
                                )}

                                <div className='flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5'>
                                    {featured.author ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#0C4C55] text-sm font-bold text-white'>
                                                {featured.author.charAt(0).toUpperCase()}
                                            </div>
                                            <span className='text-sm font-medium text-gray-600'>{featured.author}</span>
                                        </div>
                                    ) : <span />}

                                    <span className='inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C4C55]'>
                                        Read article
                                        <svg
                                            className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-1'
                                            fill='none' viewBox='0 0 24 24' stroke='currentColor'
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                )}

                {/* ── MORE ARTICLES GRID ────────────────────────────── */}
                {!error && rest.length > 0 && (
                    <>
                        <h2 className='mb-6 text-xs font-semibold uppercase tracking-widest text-gray-400'>
                            More articles
                        </h2>
                        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                            {rest.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className='group flex'>
                                    <article className='flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md'>

                                        {/* Image — cover */}
                                        <div className='relative w-full aspect-video overflow-hidden bg-gray-100'>
                                            {post.image ? (
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]'
                                                />
                                            ) : (
                                                <div className='flex h-full w-full items-center justify-center bg-linear-to-b from-[#d6eef1] to-[#bde1e6]'>
                                                    <span className='text-5xl opacity-20'>🐾</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className='flex flex-1 flex-col p-5'>
                                            <p className='mb-2 text-xs text-gray-400'>
                                                {formatDate(post.date)}
                                                {post.description ? ` · ${readTime(post.description)}` : ''}
                                            </p>

                                            <h3 className='mb-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#0C4C55]'>
                                                {post.title}
                                            </h3>

                                            {post.description && (
                                                <p className='line-clamp-2 text-sm leading-relaxed text-gray-500'>
                                                    {post.description}
                                                </p>
                                            )}

                                            <div className='mt-auto flex items-center justify-between border-t border-gray-100 pt-4'>
                                                {post.author ? (
                                                    <div className='flex items-center gap-1.5'>
                                                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#0C4C55] text-xs font-bold text-white'>
                                                            {post.author.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className='text-xs text-gray-500'>{post.author}</span>
                                                    </div>
                                                ) : <span />}
                                                <span className='text-xs font-semibold text-[#0C4C55] transition-all group-hover:underline'>
                                                    Read →
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
