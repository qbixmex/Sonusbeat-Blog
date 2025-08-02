import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const nextConfig: NextConfig = {
  siteUrl: SITE_URL ?? 'http://localhost:3000',
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: `${SITE_URL}/es`,
      hreflang: 'es',
    },
    {
      href: `${SITE_URL}/en`,
      hreflang: 'en',
    },
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      new URL('https://res.cloudinary.com/**'),
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
        search: '',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
