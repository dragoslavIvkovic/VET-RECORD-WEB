/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        turbo: {
            rules: {} // prazan objekat za pravila
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vetrecord.app'
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

module.exports = nextConfig;
