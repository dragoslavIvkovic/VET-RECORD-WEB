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
    skipTrailingSlashRedirect: true
};

export default nextConfig;
