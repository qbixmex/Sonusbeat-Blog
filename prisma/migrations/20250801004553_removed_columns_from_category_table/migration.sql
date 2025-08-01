/*
  Warnings:

  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `categories` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."categories_name_key";

-- DropIndex
DROP INDEX "public"."categories_slug_key";

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "name",
DROP COLUMN "slug";
