/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['heal-smart.vercel.app'],
  },
  trailingSlash: true,
}

module.exports = nextConfig 