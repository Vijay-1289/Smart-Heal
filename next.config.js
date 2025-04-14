/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['heal-smart.vercel.app'],
  },
  output: 'export',
  distDir: 'out',
}

module.exports = nextConfig 