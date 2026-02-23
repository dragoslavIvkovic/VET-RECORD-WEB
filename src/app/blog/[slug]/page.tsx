import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import MDXContent from '../components/MDXContent';

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
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.description || `Read ${post.title} on Vet Record blog.`,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            title: `${post.title} | Vet Record Blog`,
            description: post.description || '',
            url: `https://www.vetrecord.app/blog/${slug}`,
            type: 'article',
            publishedTime: post.date,
            authors: post.author ? [post.author] : undefined,
            images: post.image ? [{ url: post.image }] : undefined
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | Vet Record Blog`,
            description: post.description || ''
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) notFound();

    const mdxSource = await serialize(post.content, {
        parseFrontmatter: false
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: post.author
            ? { '@type': 'Person', name: post.author }
            : { '@type': 'Organization', name: 'Vet Record' },
        publisher: {
            '@type': 'Organization',
            name: 'Vet Record',
            logo: { '@type': 'ImageObject', url: 'https://www.vetrecord.app/logo.svg' }
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.vetrecord.app/blog/${slug}` }
    };

    return (
        <main className='min-h-screen'>
            <article>
                {/* Breadcrumb */}
                <nav className='border-b border-gray-200 bg-white py-4' aria-label='Breadcrumb'>
                    <div className='container mx-auto px-4'>
                        <ol className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600'>
                            <li className='shrink-0'>
                                <Link href='/' className='hover:text-[#0C4C55]'>Home</Link>
                            </li>
                            <li className='shrink-0'>/</li>
                            <li className='shrink-0'>
                                <Link href='/blog' className='hover:text-[#0C4C55]'>Blog</Link>
                            </li>
                            <li className='shrink-0'>/</li>
                            <li className='min-w-0 font-medium text-gray-900'>
                                <span className='break-words' title={post.title}>
                                    {post.title}
                                </span>
                            </li>
                        </ol>
                    </div>
                </nav>

                {/* Hero */}
                <header className='bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-12'>
                    <div className='container mx-auto px-4'>
                        <Link
                            href='/blog'
                            className='mb-6 inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white'
                        >
                            ← Back to Blog
                        </Link>
                        <h1 className='mb-4 text-3xl font-bold text-white md:text-4xl'>
                            {post.title}
                        </h1>
                        <div className='flex flex-wrap items-center gap-4 text-gray-300'>
                            {post.date && (
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                            )}
                            {post.author && (
                                <span>by {post.author}</span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className='container mx-auto px-4 py-12'>
                    <div className='mx-auto max-w-3xl'>
                        {post.image && (
                            <div className='mb-8 flex justify-center overflow-hidden rounded-xl'>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className='max-h-48 w-full max-w-md object-contain sm:max-h-56 md:max-h-64'
                                />
                            </div>
                        )}
                        <div className='prose prose-lg max-w-none'>
                            <MDXContent source={mdxSource} />
                        </div>
                    </div>
                </div>
            </article>

            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </main>
    );
}
