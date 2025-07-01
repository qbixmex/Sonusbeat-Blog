import prisma from "@/lib/prisma";
import { Article } from "@/interfaces/article.interface";

type ResponseCreateArticle = {
  ok: boolean;
  message: string;
  articles: Article[] | null;
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
export const fetchArticlesAction = async (props?: {
  limit?: number;
  offset?: number;
}): Promise<ResponseCreateArticle> => {
  const { limit, offset } = props ?? { limit: 10, offset: 0 };

  try {
    const data = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          }
        },
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
        content: item.content,
        author: {
          id: item.author.id,
          name: item.author.name!,
        },
        category: 'Pending',
        imageAlt: item.image,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription,
        seoRobots: item.seoRobots,
        publishedAt: item.publishedAt as Date,
        published: item.published,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
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

export default fetchArticlesAction;
