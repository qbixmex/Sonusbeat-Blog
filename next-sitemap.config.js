const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
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
}