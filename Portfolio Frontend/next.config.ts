/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@uiw/react-md-editor'],
  images: {
    domains: [
      'res.cloudinary.com',
      'localhost:3000',
      'portfolio-backend-six-mu.vercel.app',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
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
};

module.exports = nextConfig;
