/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8055',
                pathname: '/assets/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8055',
                pathname: '/assets/**',
            },
        ],
    },
};

export default nextConfig;
