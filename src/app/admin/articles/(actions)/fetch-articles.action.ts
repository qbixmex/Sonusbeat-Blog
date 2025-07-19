import prisma from "@/lib/prisma";

export type AdminArticle = {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  author: {
    id: string;
    name: string;
  };
  imageURL: string | null;
  imageAlt: string | null;
  seoRobots: string | null;
  published: boolean;
};

type ResponseFetchArticles = {
  ok: boolean;
  message: string;
  articles: AdminArticle[] | null;
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
}): Promise<ResponseFetchArticles> => {
  const { limit, offset } = props ?? { limit: 10, offset: 0 };

  try {
    const data = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        imageURL: true,
        imageAlt: true,
        seoRobots: true,
        published: true,
        author: {
          select: {
            id: true,
            name: true,
          }
        },
        category: {
          select: {
            id: true,
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
        imageURL: item.imageURL as string,
        imageAlt: item.imageAlt,
        author: {
          id: item.author.id,
          name: item.author.name!,
        },
        category: {
          id: item.category?.id as string,
          name: item.category?.name as string,
          slug: item.category?.slug as string,
        },
        seoRobots: item.seoRobots,
        published: item.published,
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
