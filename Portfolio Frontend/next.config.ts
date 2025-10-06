/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@uiw/react-md-editor'],
  images: {
    domains: [
      'res.cloudinary.com',
      'https://portfolio-backend-six-mu.vercel.app',
      'localhost:3000',
    ],
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
};

module.exports = nextConfig;
