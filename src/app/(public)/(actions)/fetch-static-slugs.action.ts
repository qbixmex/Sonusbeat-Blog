import prisma from "@/lib/prisma";

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
export const getStaticArticlesSlugs = async (quantity: number): Promise<{
  ok: boolean;
  slugs: string[];
  error?: string;
}> => {
  try {
    const events = await prisma.article.findMany({
      select: { slug: true },
      take: quantity,
      orderBy: { createdAt: 'desc' }
    });

    return {
      ok: true,
      slugs: events.map((article) => article.slug),
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      slugs: [],
      error: "Something went wrong !, check logs for details",
    };
  }
};