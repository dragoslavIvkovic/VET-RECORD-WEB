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

function fixImageUrl(url?: string): string | undefined {
    if (!url) return undefined;
    // Proxies Ghost images through our server to fix Mixed Content/SSL issues
    return url.replace(/.*\/content\/images\//, '/ghost-images/');
}

/**
 * Ensures Ghost anchor tags have target="_blank" and visible styling for external links.
 */
function ensureAnchorAttrs(html: string): string {
    return html.replace(
        /<a\s+([^>]*href=["']https?:\/\/[^"']+["'][^>]*)>/gi,
        (match) => {
            if (/target\s*=/i.test(match)) return match;
            return match.replace(/^<a\s/, '<a target="_blank" rel="noopener noreferrer" ');
        }
    );
}

/**
 * Converts plain URLs in HTML text to clickable links.
 * Skips URLs already inside <a href="..."> to avoid double-wrapping.
 */
function linkifyPlainUrls(html: string): string {
    const urlRegex = /(https?:\/\/[^\s<>"]+)/g;
    const linkify = (str: string) =>
        str.replace(urlRegex, (url) => {
            const clean = url.replace(/[.,;:!?)\]}'"]+$/, '');
            const trailing = url.slice(clean.length);
            const escaped = clean.replace(/"/g, '&quot;');
            return `<a href="${escaped}" target="_blank" rel="noopener noreferrer" class="text-[#0C4C55] !underline underline-offset-2 decoration-2 hover:text-[#08353B]">${clean}</a>${trailing}`;
        });

    const parts = html.split(/(<a\s[^>]*>|<\/a>)/gi);
    let result = '';
    let insideAnchor = false;
    for (const part of parts) {
        if (/^<a\s/i.test(part)) {
            insideAnchor = true;
            result += part;
        } else if (/^<\/a>$/i.test(part)) {
            insideAnchor = false;
            result += part;
        } else if (!insideAnchor) {
            result += linkify(part);
        } else {
            result += part;
        }
    }
    return result;
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
            image: fixImageUrl(post.feature_image),
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
        image: fixImageUrl(post.feature_image),
        author: primaryAuthor,
        html: post.html
            ? ensureAnchorAttrs(
                  linkifyPlainUrls(
                      post.html
                          .replace(/https?:\/\/[\w.-]+\/content\/images\//g, '/ghost-images/')
                          .replace(new RegExp(`${config.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`, 'g'), '/blog/')
                  )
              )
            : '',
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
