/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true, // Recommended for static hosting to avoid 403/404 on refresh
    images: {
        unoptimized: true, // Required for static export
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
            },
            {
                protocol: 'https',
                hostname: 'solisinverterindonesia.com',
            },
            {
                protocol: 'https',
                hostname: 'cms.solisinverterindonesia.com',
            }
        ],
    },
};

module.exports = nextConfig;
