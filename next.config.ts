/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // necesario para Vercel y hosting optimizado
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
};

export default nextConfig;
