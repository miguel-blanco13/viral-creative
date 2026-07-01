import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// next-intl v4 — apunta al request config en i18n/request.ts
const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN — imágenes del CMS
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Instagram CDN — feed de Instagram
      { protocol: 'https', hostname: '*.cdninstagram.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
