import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
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
    }
};

export default nextConfig;
