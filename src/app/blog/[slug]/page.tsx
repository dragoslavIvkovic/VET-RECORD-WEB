import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BlogAppDownloads from '../components/BlogAppDownloads';
import BlogDownloadPopup from '../components/BlogDownloadPopup';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    try {
        const slugs = await getBlogSlugs();
        return slugs.map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
        ? ''
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function estimateReadTime(text: string): { minutes: number; label: string } {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return { minutes, label: `${minutes} min read` };
}

// ── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return { title: 'Post Not Found' };

    const title = post.meta_title || post.title;
    const description = post.meta_description || post.description || `Read ${post.title} on Vet Record blog.`;

    return {
        title,
        description,
        alternates: { canonical: `https://www.vetrecord.app/blog/${slug}` },
        openGraph: {
            title: `${title} | Vet Record Blog`,
            description,
            url: `https://www.vetrecord.app/blog/${slug}`,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.updated_at,
            authors: post.author ? [post.author] : undefined,
            images: post.image ? [{ url: post.image, alt: title }] : undefined
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Vet Record Blog`,
            description
        }
    };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) notFound();

    // Strip HTML tags for estimating word count and read time
    const textContent = post.html.replace(/<[^>]+>/g, '');
    const { minutes, label: readTimeLabel } = estimateReadTime(textContent);
    const wordCount = textContent.trim().split(/\s+/).length;

    // ── JSON-LD (Article — requested for AEO) ───────────
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description || post.description || '',
        datePublished: post.date,
        dateModified: post.updated_at || post.date,
        wordCount,
        timeRequired: `PT${minutes}M`,
        inLanguage: 'en-US',
        author: post.author
            ? { '@type': 'Person', name: post.author }
            : { '@type': 'Organization', name: 'Vet Record' },
        publisher: {
            '@type': 'Organization',
            name: 'Vet Record',
            logo: { '@type': 'ImageObject', url: 'https://www.vetrecord.app/logo.svg' }
        },
        image: post.image
            ? { '@type': 'ImageObject', url: post.image, caption: post.title }
            : undefined,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.vetrecord.app/blog/${slug}`
        }
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.vetrecord.app'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://www.vetrecord.app/blog'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://www.vetrecord.app/blog/${slug}`
            }
        ]
    };

    return (
        <main className='min-h-screen bg-gray-50'>
            {/* Client: scroll progress bar — rendered at very top of page */}
            <ScrollProgressBar />

            {/* ── Breadcrumb ─────────────────────────────────────────── */}
            <nav className='border-b border-gray-200 bg-white' aria-label='Breadcrumb'>
                <div className='container mx-auto px-4 py-3 sm:px-6'>
                    <ol className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500'>
                        <li className='shrink-0'>
                            <Link href='/' className='transition-colors hover:text-[#0C4C55]'>Home</Link>
                        </li>
                        <li className='shrink-0 text-gray-300' aria-hidden>/</li>
                        <li className='shrink-0'>
                            <Link href='/blog' className='transition-colors hover:text-[#0C4C55]'>Blog</Link>
                        </li>
                        <li className='shrink-0 text-gray-300' aria-hidden>/</li>
                        <li className='min-w-0 font-medium text-gray-800'>
                            <span className='line-clamp-1'>{post.title}</span>
                        </li>
                    </ol>
                </div>
            </nav>

            <article itemScope itemType='https://schema.org/Article'>
                {/* ── Header / Hero ───────────────────────────────────── */}
                <header className='bg-[#0C4C55]'>
                    {/* Cover image */}
                    {post.image && (
                        <div className='relative w-full aspect-video overflow-hidden bg-[#0C4C55]/5 sm:aspect-[2.5/1] lg:aspect-[3/1]'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.image}
                                alt={post.title}
                                className='absolute inset-0 h-full w-full object-contain p-4'
                                itemProp='image'
                            />
                        </div>
                    )}

                    {/* Title + meta */}
                    <div className='container mx-auto px-4 py-10 sm:px-6'>
                        <Link
                            href='/blog'
                            className='mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-cyan-200 transition-colors hover:bg-white/20 hover:text-white'
                        >
                            <svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                            </svg>
                            Back to Blog
                        </Link>

                        <h1
                            className='mb-5 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl'
                            itemProp='headline'
                        >
                            {post.title}
                        </h1>

                        {/* Meta row */}
                        <div className='flex flex-wrap items-center gap-4'>
                            {post.author && (
                                <div className='flex items-center gap-2.5' itemProp='author' itemScope itemType='https://schema.org/Person'>
                                    <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white' aria-hidden>
                                        {post.author.charAt(0).toUpperCase()}
                                    </div>
                                    <span className='text-sm font-medium text-teal-100' itemProp='name'>{post.author}</span>
                                </div>
                            )}

                            <div className='flex flex-wrap items-center gap-3 text-sm text-teal-200/80'>
                                {post.date && (
                                    <time dateTime={post.date} itemProp='datePublished' className='flex items-center gap-1.5'>
                                        <svg className='h-4 w-4 opacity-70' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                        {formatDate(post.date)}
                                    </time>
                                )}
                                <span className='text-teal-300/40' aria-hidden>·</span>
                                <span className='flex items-center gap-1.5'>
                                    <svg className='h-4 w-4 opacity-70' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                    {readTimeLabel}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Body ────────────────────────────────────────────── */}
                <div className='container mx-auto px-4 py-12 sm:px-6'>
                    <div className='mx-auto max-w-3xl'>

                        {/* TL;DR callout — shown when frontmatter has tldr or summary */}
                        {post.tldr && (
                            <aside
                                aria-label='TL;DR — Quick summary'
                                className='mb-8 rounded-2xl border border-[#0C4C55]/20 bg-[#0C4C55]/5 p-6'
                            >
                                <div className='mb-2 flex items-center gap-2'>
                                    <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#0C4C55] text-xs font-bold text-white'>
                                        ✦
                                    </span>
                                    <span className='text-xs font-bold uppercase tracking-widest text-[#0C4C55]'>
                                        TL;DR
                                    </span>
                                </div>
                                <p className='text-base leading-relaxed text-gray-700'>{post.tldr}</p>
                            </aside>
                        )}

                        {/* Description lead — shown when no tldr, or always if present */}
                        {post.description && !post.tldr && (
                            <p className='mb-10 border-l-4 border-[#0C4C55] pl-5 text-lg font-medium leading-relaxed text-gray-600'>
                                {post.description}
                            </p>
                        )}

                        {/* HTML article body – prose + prose-article for Ghost structure (p, h2, h3) and link styling */}
                        <div
                            className='prose-article rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-10 prose max-w-none'
                            itemProp='articleBody'
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />

                        {/* Medical Disclaimer */}
                        <div className='mt-8 rounded-xl border-l-4 border-red-400 bg-red-50 p-6 shadow-sm sm:mt-10'>
                            <div className='flex gap-3'>
                                <svg className='h-5 w-5 shrink-0 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                                </svg>
                                <div>
                                    <h3 className='text-sm font-bold uppercase tracking-wider text-red-800 sm:text-base'>
                                        Medical Disclaimer
                                    </h3>
                                    <p className='mt-2 text-sm leading-relaxed text-red-700/90'>
                                        This content is for informational purposes only and is <strong>NOT</strong> a substitute for professional veterinary advice, diagnosis, or treatment. Always seek the advice of your veterinarian or other qualified animal health provider with any questions you may have regarding a medical condition for your pet. Never disregard professional advice or delay in seeking it because of something you have read on this blog.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* App Downloads CTA */}
                        <div className='mt-8 sm:mt-12'>
                            <BlogAppDownloads />
                        </div>

                        {/* Footer */}
                        <div className='mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8'>
                            <Link
                                href='/blog'
                                className='inline-flex items-center gap-2 rounded-full border border-[#0C4C55]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#0C4C55] shadow-sm transition-all hover:bg-[#0C4C55] hover:text-white'
                            >
                                <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                                </svg>
                                Back to Blog
                            </Link>

                            {post.author && (
                                <p className='text-sm text-gray-400'>
                                    Written by <strong className='text-gray-600'>{post.author}</strong>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            {/* ── JSON-LD (BlogPosting & Breadcrumb schema) ────────────────────────── */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <BlogDownloadPopup />
        </main>
    );
}
