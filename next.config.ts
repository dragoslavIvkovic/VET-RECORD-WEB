import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    transpilePackages: ['next-mdx-remote'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vetrecord.app'
            },
            {
                protocol: 'https',
                hostname: 'play.google.com'
            },
            {
                protocol: 'https',
                hostname: 'tools.applemediaservices.com'
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com'
            },
            {
                protocol: 'http',
                hostname: 'n8n-ghost-310718-77-42-42-63.traefik.me'
            },
            {
                protocol: 'https',
                hostname: 'static.ghost.org'
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://eu.i.posthog.com https://eu-assets.i.posthog.com https://*.google.com https://va.vercel-scripts.com https://googleads.g.doubleclick.net https://vercel.live; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://eu.i.posthog.com https://raw.githubusercontent.com https://*.google.com https://va.vercel-scripts.com https://googleads.g.doubleclick.net https://vercel.live; img-src 'self' data: blob: https://raw.githubusercontent.com https://vetrecord.app https://play.google.com https://tools.applemediaservices.com https://api.producthunt.com https://ph-files.imgix.net https://eu-assets.i.posthog.com http://n8n-ghost-310718-77-42-42-63.traefik.me https://googleads.g.doubleclick.net https://static.ghost.org https://*.google.com https://*.google.rs https://www.google.com https://www.google.rs https://vercel.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://vercel.live; frame-src 'self' https://www.youtube.com https://api.producthunt.com https://vercel.live;"
                    }
                ]
            }
        ];
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.vetrecord.app' }],
                destination: 'https://vetrecord.app/:path*',
                permanent: true
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/ingest/static/:path*',
                destination: 'https://eu-assets.i.posthog.com/static/:path*'
            },
            {
                source: '/ingest/:path*',
                destination: 'https://eu.i.posthog.com/:path*'
            }
        ];
    },
    skipTrailingSlashRedirect: true,
    // @ts-ignore - allowedDevOrigins is a new property in Next.js 16.1.1 not yet in types
    allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000']
};

export default nextConfig;
