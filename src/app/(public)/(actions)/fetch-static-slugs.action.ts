import prisma from "@/lib/prisma";

type GetStaticArticlesSlugsResponse = Promise<{
  ok: boolean;
  articles: {
    categoryTranslations: {
      language: string;
      slug: string;
    }[];
    articleTranslations: {
      language: string;
      slug: string;
    }[];
  }[];
  error?: string;
}>;

/**
 * Get slugs of latest articles.
 * 
 * @param quantity The number of slugs to fetch.
 * 
 * @example ```typescript
 * getStaticArticlesSlugs(10); // latest 10.
 * ```
 * 
 * @returns The slugs of the latest required articles.
 */
export const getStaticArticlesSlugs = async (quantity: number): GetStaticArticlesSlugsResponse => {
  try {
    const articles = await prisma.article.findMany({
      select: {
        translations: {
          select: {
            language: true,
            slug: true,
          }
        },
        category: {
          select: {
            translations: {
              select: {
                language: true,
                slug: true,
              }
            }
          }
        }
      },
      take: quantity,
      orderBy: { createdAt: 'desc' }
    });

    return {
      ok: true,
      articles: articles.map((article) => ({
        categoryTranslations: article.category?.translations ?? [],
        articleTranslations: article.translations ?? [],
      })),
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      articles: [],
      error: "Something went wrong !, check logs for details",
    };
  }
};