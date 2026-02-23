import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    transpilePackages: ['next-mdx-remote'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vetrecord.app',
            },
            {
                protocol: 'https',
                hostname: 'play.google.com',
            },
            {
                protocol: 'https',
                hostname: 'tools.applemediaservices.com',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
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
                has: [{ type: 'host', value: 'vetrecord.app' }],
                destination: 'https://www.vetrecord.app/:path*',
                permanent: true,
            },
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.vetrecord.app' }],
                missing: [{ type: 'header', key: 'x-forwarded-proto' }],
                destination: 'https://www.vetrecord.app/:path*',
                permanent: true,
            },
        ];
    }
};

export default nextConfig;
