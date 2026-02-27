/**
 * Blog utilities - fetches markdown posts from GitHub and parses frontmatter
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
    content: string;
};

function parseRepoUrl(url: string): { owner: string; repo: string } {
    const trimmed = url.trim();
    const match = trimmed.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git|$)/) || trimmed.match(/^([^/]+)\/([^/]+)$/);
    if (!match) throw new Error(`Invalid BLOG_GITHUB_REPO_URL: ${url}`);
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

const DEFAULT_BLOG_REPO = 'https://github.com/dragoslavIvkovic/blogpost.git';

function getBaseUrl(): { owner: string; repo: string; branch: string; path: string } {
    const url = process.env.BLOG_GITHUB_REPO_URL || DEFAULT_BLOG_REPO;
    const { owner, repo } = parseRepoUrl(url);
    const branch = process.env.BLOG_GITHUB_BRANCH || 'main';
    const path = process.env.BLOG_GITHUB_POSTS_PATH || 'posts';
    return { owner, repo, branch, path };
}

function getRawBaseUrl(): string {
    const { owner, repo, branch, path } = getBaseUrl();
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

function getApiBaseUrl(): string {
    const { owner, repo, path } = getBaseUrl();
    return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

function getAuthHeaders(): HeadersInit {
    const token = process.env.BLOG_GITHUB_TOKEN;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Transform relative image URLs in markdown to absolute raw GitHub URLs
 */
function transformImageUrls(content: string, baseUrl: string): string {
    return content.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (_, alt, src) => {
            if (src.startsWith('http://') || src.startsWith('https://')) return `![${alt}](${src})`;
            const resolved = src.startsWith('/') ? `${baseUrl}${src}` : `${baseUrl}/${src}`;
            return `![${alt}](${resolved})`;
        }
    );
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { frontmatter: {}, body: content };

    const frontmatter: Record<string, string> = {};
    match[1].split('\n').forEach(line => {
        const colon = line.indexOf(':');
        if (colon > 0) {
            const key = line.slice(0, colon).trim();
            const value = line.slice(colon + 1).trim().replace(/^['"]|['"]$/g, '');
            frontmatter[key] = value;
        }
    });
    return { frontmatter, body: match[2] };
}

/**
 * Fetch list of blog posts from GitHub
 */
export async function getBlogPosts(): Promise<BlogPostMeta[]> {

    const apiUrl = getApiBaseUrl();
    const rawBase = getRawBaseUrl();

    const res = await fetch(apiUrl, {
        headers: { Accept: 'application/vnd.github.v3+json', ...getAuthHeaders() },
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        if (res.status === 404) return [];
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const items: { name: string; type: string; path?: string }[] = await res.json();
    const mdFiles = items.filter(f => f.type === 'file' && /\.mdx?$/i.test(f.name));

    const posts: BlogPostMeta[] = [];
    const { owner, repo, branch } = getBaseUrl();

    for (const file of mdFiles) {
        const filePath = file.path || `${process.env.BLOG_GITHUB_POSTS_PATH || 'posts'}/${file.name}`;
        const slug = file.name.replace(/\.mdx?$/i, '');
        const fileRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`, { next: { revalidate: 3600 } });
        if (!fileRes.ok) continue;

        const text = await fileRes.text();
        const { frontmatter } = parseFrontmatter(text);

        let imageUrl = frontmatter.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = imageUrl.startsWith('/') ? `${rawBase}${imageUrl}` : `${rawBase}/${imageUrl}`;
        }

        posts.push({
            slug,
            title: frontmatter.title || slug,
            description: frontmatter.description || '',
            date: frontmatter.date || '',
            image: imageUrl || frontmatter.image,
            author: frontmatter.author,
            tldr: frontmatter.tldr || frontmatter.summary || undefined
        });
    }

    posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    return posts;
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {

    const rawBase = getRawBaseUrl();

    for (const ext of ['.md', '.mdx']) {
        const url = `${rawBase}/${slug}${ext}`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) continue;

        const text = await res.text();
        const { frontmatter, body } = parseFrontmatter(text);

        const content = transformImageUrls(body, rawBase);

        let imageUrl = frontmatter.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = imageUrl.startsWith('/') ? `${rawBase}${imageUrl}` : `${rawBase}/${imageUrl}`;
        }

        return {
            slug,
            title: frontmatter.title || slug,
            description: frontmatter.description || '',
            date: frontmatter.date || '',
            image: imageUrl || frontmatter.image,
            author: frontmatter.author,
            tldr: frontmatter.tldr || frontmatter.summary || undefined,
            content
        };
    }

    return null;
}

/**
 * Get all blog slugs for static generation
 */
export async function getBlogSlugs(): Promise<string[]> {
    const posts = await getBlogPosts();
    return posts.map(p => p.slug);
}
