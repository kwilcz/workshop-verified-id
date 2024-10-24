/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
