export const config = {
  schedule: '0 6 * * *', // Runs every day at 6:00 AM UTC
};

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { SitemapBuilder } from 'next-sitemap';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
        loc: `${URL}/${categoryTranslation?.language ?? 'es'}/${categoryTranslation?.slug ?? 'un-categorized'}/${translation.slug}`,
        lastmod: article.updatedAt.toISOString(),
        changefreq: 'daily' as const,
        priority: 0.8,
      };
    })
  );

  const root = ["es", "en"].map(lang => ({
    loc: `${URL}/${lang}/`,
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
    const sitemapXml = builder.buildSitemapXml(fields);

    return new NextResponse(sitemapXml, {
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
