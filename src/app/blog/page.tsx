import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Pet health tips, vaccination guides, and care advice from Vet Record. Stay informed about your dog and cat health.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Blog | Vet Record – Pet Health Tips & Guides',
        description: 'Pet health tips, vaccination guides, and care advice. Stay informed about your dog and cat health.',
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
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPage() {
    let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
    let error: string | null = null;

    try {
        posts = await getBlogPosts();
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load blog posts';
    }

    return (
        <main className='min-h-screen'>
            {/* Hero */}
            <section className='bg-linear-to-b from-[#0C4C55] to-[#0a3d44] py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <span className='mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm'>Blog</span>
                    <h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>
                        Pet Health Tips & Guides
                    </h1>
                    <p className='mx-auto max-w-2xl text-lg text-gray-300'>
                        Expert advice on vaccinations, nutrition, and care for your dogs and cats.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className='container mx-auto px-4 py-16'>
                {error && (
                    <div className='rounded-xl bg-amber-50 border border-amber-200 p-6 text-center text-amber-800'>
                        <p className='font-medium'>{error}</p>
                        <p className='mt-2 text-sm'>Check BLOG_GITHUB_REPO_URL in your environment.</p>
                    </div>
                )}

                {!error && posts.length === 0 && (
                    <div className='rounded-xl bg-gray-50 border border-gray-200 p-12 text-center'>
                        <p className='text-lg text-gray-600'>No blog posts yet.</p>
                        <p className='mt-2 text-gray-500'>Add markdown files to your GitHub repo to see them here.</p>
                    </div>
                )}

                {!error && posts.length > 0 && (
                    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                        {posts.map((post) => (
                            <article
                                key={post.slug}
                                className='group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
                            >
                                <Link href={`/blog/${post.slug}`} className='block flex-1'>
                                    {post.image ? (
                                        <div className='relative aspect-[16/10] overflow-hidden bg-gray-100'>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                            />
                                        </div>
                                    ) : (
                                        <div className='flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#0C4C55]/10 to-[#0a3d44]/10'>
                                            <span className='text-5xl'>🐾</span>
                                        </div>
                                    )}
                                    <div className='flex flex-1 flex-col p-6'>
                                        <time
                                            dateTime={post.date}
                                            className='mb-2 text-sm font-medium text-[#0C4C55]'
                                        >
                                            {formatDate(post.date)}
                                        </time>
                                        <h2 className='mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#0C4C55]'>
                                            {post.title}
                                        </h2>
                                        <p className='line-clamp-3 text-gray-600'>
                                            {post.description || 'Read more...'}
                                        </p>
                                        {post.author && (
                                            <p className='mt-3 text-sm text-gray-500'>by {post.author}</p>
                                        )}
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
