import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Povolené domény pro externí obrázky
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/podlahy-zapletal-images/**',
      },
      {
        protocol: 'https', 
        hostname: 'cdn.podlahyzapletal.cz',
        port: '',
        pathname: '/**',
      }
    ],
    
    // Formáty pro optimalizaci
    formats: ['image/webp', 'image/avif'],
    
    // Velikosti pro responsive design
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Vypni optimalizaci pro CDN - použij přímé odkazy
    unoptimized: true,
    
    // Cache TTL
    minimumCacheTTL: 31536000, // 1 rok
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ]
  },

  // Optimalizace pro production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Source maps pro debugging (vypnuto v produkci)
  productionBrowserSourceMaps: false,

  // Experimentální features pro rychlost
  experimental: {
    optimizePackageImports: ['@/components'],
  },
};

export default nextConfig;
