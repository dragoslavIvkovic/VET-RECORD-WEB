import type { Metadata } from 'next';

import { getBlogPosts } from '@/lib/blog';

import BlogFilterContainer from './components/BlogFilterContainer';

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



export default async function BlogPage() {
    let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
    let error: string | null = null;

    try {
        posts = await getBlogPosts();
    } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to load blog posts';
    }

    return (
        <main className='min-h-screen bg-gray-50'>
            {/* ── PAGE HEADER ───────────────────────────────────────── */}
            <section className='relative overflow-hidden bg-[#0C4C55] py-16'>
                <div className='pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/5' />
                <div className='pointer-events-none absolute right-0 -bottom-24 h-64 w-64 rounded-full bg-cyan-400/10' />
                <div className='relative container mx-auto px-4 text-center'>
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
                        <p className='mt-1 text-sm text-amber-700'>Check GHOST_URL and GHOST_CONTENT_API_KEY in your environment.</p>
                    </div>
                )}

                {/* ── EMPTY ─────────────────────────────────────────── */}
                {!error && posts.length === 0 && (
                    <div className='mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-14 text-center shadow-sm'>
                        <p className='text-4xl'>🐾</p>
                        <p className='mt-1 text-sm text-gray-500'>Add posts to your Ghost CMS.</p>
                    </div>
                )}

                {/* ── BLOG FILTER CONTAINER ─────────────────────────── */}
                {!error && posts.length > 0 && (
                    <div className='-mx-4 sm:mx-0'>
                        <BlogFilterContainer posts={posts} />
                    </div>
                )}
            </div>
        </main>
    );
}
