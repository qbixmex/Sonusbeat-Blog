import { PublicArticlesList } from "@/interfaces/article.interface";
import prisma from "@/lib/prisma";

type ResponseFetchArticles = {
  ok: boolean;
  message: string;
  articles: PublicArticlesList[] | null;
};

/**
 * Action to fetch articles from the database.
 * @param props - Optional parameters for pagination.
 * @param props.limit - Number of articles to fetch (default is 10).
 * @param props.offset - Offset for pagination (default is 0).
 * @example```
 * // Examples usage:
 * fetchArticlesAction({ limit: 5 });
 * fetchArticlesAction({ offset: 10 });
 * fetchArticlesAction({ limit: 5, offset: 0 });
 * fetchArticlesAction({ limit: 20, offset: 10 });
 * ```
 * @returns Response containing the articles or an error message.
 */
export const fetchPublicArticlesAction = async (props?: {
  limit?: number;
  offset?: number;
}): Promise<ResponseFetchArticles> => {
  const { limit, offset } = props ?? { limit: 10, offset: 0 };

  try {
    const data = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        imageAlt: true,
        description: true,
        seoTitle: true,
        seoDescription: true,
        seoRobots: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
            username: true,
          }
        },
        category: {
          select: {
            name: true,
            slug: true,
          }
        }
      },
      take: limit,
      skip: offset,
    });

    return {
      ok: true,
      message: 'Los artículos fueron obtenidos satisfactoriamente',
      articles: data.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image as string,
        slug: item.slug,
        description: item.description,
        author: {
          name: item.author.name!,
          username: item.author.username ?? 'Not provided',
        },
        category: {
          name: item.category?.name as string,
          slug: item.category?.slug as string,
        },
        imageAlt: item.image ?? 'Not provided',
        seoTitle: item.seoTitle!,
        seoDescription: item.seoDescription!,
        seoRobots: item.seoRobots,
        publishedAt: item.publishedAt as Date,
      })),
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching articles");
      return {
        ok: false,
        message: error.message,
        articles: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: "Error inesperado al obtener los artículos, revise los logs del servidor",
      articles: null,
    };
  }
};

export default fetchPublicArticlesAction;

