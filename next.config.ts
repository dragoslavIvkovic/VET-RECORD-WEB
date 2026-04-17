import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    transpilePackages: ['next-mdx-remote'],
    images: {
        qualities: [50, 75, 80, 85, 90, 100],
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
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
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
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://eu.i.posthog.com https://eu-assets.i.posthog.com https://*.google.com https://va.vercel-scripts.com https://googleads.g.doubleclick.net https://vercel.live; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://eu.i.posthog.com https://raw.githubusercontent.com https://*.google.com https://va.vercel-scripts.com https://googleads.g.doubleclick.net https://vercel.live wss://*.pusher.com https://*.pusher.com; img-src 'self' data: blob: https://raw.githubusercontent.com https://vetrecord.app https://play.google.com https://tools.applemediaservices.com https://api.producthunt.com https://ph-files.imgix.net https://eu-assets.i.posthog.com http://n8n-ghost-310718-77-42-42-63.traefik.me https://googleads.g.doubleclick.net https://static.ghost.org https://images.unsplash.com https://*.google.com https://*.google.rs https://www.google.com https://www.google.rs https://vercel.com; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://vercel.live; frame-src 'self' https://www.youtube.com https://api.producthunt.com https://vercel.live;"
                    }
                ]
            },
            {
                source: '/ingest/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ];
    },
    async redirects() {
        return [
            {
                source: '/index.html',
                destination: '/',
                permanent: true
            },
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
                source: '/ghost-images/:path*',
                destination: 'http://n8n-ghost-310718-77-42-42-63.traefik.me/content/images/:path*'
            },
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
    allowedDevOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000', '192.168.1.3']
};

export default nextConfig;
