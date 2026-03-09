/**
 * Blog utilities - fetches posts from Ghost Content API
 */

export type BlogPostMeta = {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated_at?: string;
    image?: string;
    author?: string;
    tldr?: string;
    meta_title?: string;
    meta_description?: string;
};

export type BlogPost = BlogPostMeta & {
    html: string;
};

function getGhostConfig() {
    const url = process.env.GHOST_URL;
    const key = process.env.GHOST_CONTENT_API_KEY;
    
    if (!url || !key) {
        console.error('MISSING ENV VARS:', { 
            hasUrl: !!url, 
            hasKey: !!key,
            nodeEnv: process.env.NODE_ENV 
        });
        return null;
    }
    return { url: url.replace(/\/$/, ''), key };
}

function getGhostApiUrl(endpoint: string) {
    const config = getGhostConfig();
    if (!config) {
        throw new Error('GHOST_URL or GHOST_CONTENT_API_KEY environment variables are not set.');
    }
    const separator = endpoint.includes('?') ? '&' : '?';
    return `${config.url}/ghost/api/content${endpoint}${separator}key=${config.key}`;
}

/**
 * Fetch list of blog posts from Ghost
 */
export async function getBlogPosts(): Promise<BlogPostMeta[]> {
    const config = getGhostConfig();
    if (!config) {
        console.warn('Ghost variables not set at runtime, returning empty posts list.');
        return [];
    }

    // Ghost endpoint includes authors and tags for potential future use or displaying author name
    const url = getGhostApiUrl('/posts/?include=authors,tags');

    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
        console.error(`Ghost API error for ${url}: ${res.status} ${res.statusText}`);
        if (res.status === 404) return [];
        throw new Error(`Ghost API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const posts: any[] = data.posts || [];

    const resultPosts: BlogPostMeta[] = posts.map(post => {
        const primaryAuthor = post.primary_author?.name || undefined;
        
        return {
            slug: post.slug,
            title: post.title,
            description: post.custom_excerpt || post.excerpt || '',
            date: post.published_at || post.created_at || '',
            updated_at: post.updated_at || post.published_at || '',
            image: post.feature_image || undefined,
            author: primaryAuthor,
            meta_title: post.meta_title || post.title,
            meta_description: post.meta_description || post.custom_excerpt || post.excerpt || '',
        };
    });

    return resultPosts;
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const config = getGhostConfig();
    if (!config) {
        console.warn('Ghost variables not set at runtime (slug fetch), returning null.');
        return null;
    }

    const url = getGhostApiUrl(`/posts/slug/${slug}/?include=authors,tags`);

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
        console.error(`Ghost API error for ${url} (slug: ${slug}): ${res.status} ${res.statusText}`);
        return null;
    }

    const data = await res.json();
    const post = data.posts?.[0];

    if (!post) return null;

    const primaryAuthor = post.primary_author?.name || undefined;

    return {
        slug: post.slug,
        title: post.title,
        description: post.custom_excerpt || post.excerpt || '',
        date: post.published_at || post.created_at || '',
        updated_at: post.updated_at || post.published_at || '',
        image: post.feature_image || undefined,
        author: primaryAuthor,
        html: post.html || '',
        meta_title: post.meta_title || post.title,
        meta_description: post.meta_description || post.custom_excerpt || post.excerpt || '',
    };
}

/**
 * Get all blog slugs for static generation
 */
export async function getBlogSlugs(): Promise<string[]> {
    const posts = await getBlogPosts();
    return posts.map(p => p.slug);
}
