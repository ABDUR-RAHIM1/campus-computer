/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // সব ডোমেইনের জন্য wildcard (Next.js 13+ এ কাজ করে)
            },
        ],
    },
};

export default nextConfig;
