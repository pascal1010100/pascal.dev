/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // ← CORREGIDO AQUÍ
  },
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
};

export default nextConfig;
