export const config = {
  schedule: '0 6 * * *', // Runs every day at 6:00 AM UTC
};

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { SitemapBuilder } from 'next-sitemap';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function GET(request: Request) {
  const articles = await prisma.article.findMany({
    select: {
      updatedAt: true,
      category: {
        select: {
          translations: {
            select: {
              language: true,
              slug: true,
            },
          }
        }
      },
      translations: {
        select: {
          language: true,
          slug: true,
        },
      }
    },
  });

  const entries = articles.flatMap(article =>
    article.translations.map(translation => {
      const categoryTranslation = article.category?.translations.find(
        catTrans => catTrans.language === translation.language
      );
      return {
        loc: `${SITE_URL}/${categoryTranslation?.language ?? 'es'}/${categoryTranslation?.slug ?? 'un-categorized'}/${translation.slug}`,
        lastmod: article.updatedAt.toISOString(),
        changefreq: 'daily' as const,
        priority: 0.8,
      };
    })
  );

  const root = ["es", "en"].map(lang => ({
    loc: `${SITE_URL}/${lang}/`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily' as const,
    priority: 1.0,
  }));

  const fields = [
    ...root,
    ...entries,
  ];

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
  }

  try {
    const builder = new SitemapBuilder();
    const CHUNK_SIZE = 50000;
    const publicDir = path.join(process.cwd(), 'public');

    // Split the fields into chunks of CHUNK_SIZE
    const chunks = [];
    for (let i = 0; i < fields.length; i += CHUNK_SIZE) {
      chunks.push(fields.slice(i, i + CHUNK_SIZE));
    }

    // Divide the sitemap into multiple files if necessary
    const sitemapFiles: string[] = [];

    chunks.forEach((chunk, index) => {
      const xml = builder.buildSitemapXml(chunk);
      const filename = `sitemap-${index}.xml`;
      fs.writeFileSync(path.join(publicDir, filename), xml);
      sitemapFiles.push(`${SITE_URL}/${filename}`);
    });

    // Generate the sitemap index XML
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`
      + `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
      + sitemapFiles.map(loc => `  <sitemap><loc>${loc}</loc></sitemap>`).join('\n')
      + `\n</sitemapindex>`;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml);

    return new NextResponse(sitemapIndexXml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      {
        ok: false,
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
};
