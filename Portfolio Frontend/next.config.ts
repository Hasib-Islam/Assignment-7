/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@uiw/react-md-editor'],
  images: {
    domains: ['res.cloudinary.com', 'localhost:3000'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
