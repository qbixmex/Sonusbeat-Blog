/*
  Warnings:

  - You are about to drop the column `content` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `imageAlt` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescription` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `articles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."articles_slug_key";

-- AlterTable
ALTER TABLE "public"."articles" DROP COLUMN "content",
DROP COLUMN "description",
DROP COLUMN "imageAlt",
DROP COLUMN "seoDescription",
DROP COLUMN "seoTitle",
DROP COLUMN "slug",
DROP COLUMN "title";
