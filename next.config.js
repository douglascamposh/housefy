/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['housefy-dev-bucket.s3.amazonaws.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
}
module.exports = nextConfig
