/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true,
    domains: [],
    remotePatterns: []
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/icons-material', '@mui/material'],
    scrollRestoration: true
  },
  trailingSlash: true,
  reactStrictMode: true
}

module.exports = nextConfig
