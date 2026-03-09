/**
 * Blog utilities - fetches posts from Ghost Content API
 */

export type BlogPostMeta = {
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    author?: string;
    tldr?: string;
};

export type BlogPost = BlogPostMeta & {
    html: string;
};

const GHOST_URL = process.env.GHOST_URL;
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY;

function getGhostApiUrl(endpoint: string) {
    if (!GHOST_URL || !GHOST_KEY) {
        throw new Error('GHOST_URL or GHOST_CONTENT_API_KEY environment variables are not set.');
    }
    const cleanUrl = GHOST_URL.replace(/\/$/, '');
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${cleanUrl}/ghost/api/content${endpoint}${separator}key=${GHOST_KEY}`;
}

/**
 * Fetch list of blog posts from Ghost
 */
export async function getBlogPosts(): Promise<BlogPostMeta[]> {
    if (!GHOST_URL || !GHOST_KEY) {
        console.warn('Ghost variables not set, returning empty posts list.');
        return [];
    }

    // Ghost endpoint includes authors and tags for potential future use or displaying author name
    const url = getGhostApiUrl('/posts/?include=authors,tags');

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error(`Ghost API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const posts: any[] = data.posts || [];

    const resultPosts: BlogPostMeta[] = posts.map(post => {
        const primaryAuthor = post.primary_author?.name || undefined;
        // Looking for a tag that acts as a tl;dr, or simply leaving it undefined for now
        // If we want a specific custom field we can pull it from `post.custom_excerpt`
        
        return {
            slug: post.slug,
            title: post.title,
            description: post.custom_excerpt || post.excerpt || '',
            date: post.published_at || post.created_at || '',
            image: post.feature_image || undefined,
            author: primaryAuthor,
        };
    });

    return resultPosts;
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    if (!GHOST_URL || !GHOST_KEY) {
        return null;
    }

    const url = getGhostApiUrl(`/posts/slug/${slug}/?include=authors,tags`);

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = await res.json();
    const post = data.posts?.[0];

    if (!post) return null;

    const primaryAuthor = post.primary_author?.name || undefined;

    return {
        slug: post.slug,
        title: post.title,
        description: post.custom_excerpt || post.excerpt || '',
        date: post.published_at || post.created_at || '',
        image: post.feature_image || undefined,
        author: primaryAuthor,
        html: post.html || '',
    };
}

/**
 * Get all blog slugs for static generation
 */
export async function getBlogSlugs(): Promise<string[]> {
    const posts = await getBlogPosts();
    return posts.map(p => p.slug);
}
