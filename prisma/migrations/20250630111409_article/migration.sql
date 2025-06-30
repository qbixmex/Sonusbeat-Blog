-- CreateEnum
CREATE TYPE "SeoRobotsOption" AS ENUM ('index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow');

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "slug" VARCHAR(250) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT DEFAULT 'article-default.jpg',
    "imageAlt" VARCHAR(100),
    "author_id" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoRobots" "SeoRobotsOption"[] DEFAULT ARRAY['noindex, nofollow']::"SeoRobotsOption"[],
    "publishedAt" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
