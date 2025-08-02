import { PublicArticleForHomePage } from "@/interfaces/article.interface";
import prisma from "@/lib/prisma";

type ResponseFetchArticles = {
  ok: boolean;
  message: string;
  articles: PublicArticleForHomePage[] | null;
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
    const articles = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
      where: { published: true },
      select: {
        id: true,
        imageURL: true,
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
            translations: {
              select: {
                language: true,
                slug: true,
                name: true,
              }
            },
          }
        },
        translations: {
          select: {
            language: true,
            title: true,
            slug: true,
            description: true,
            imageAlt: true,
            seoTitle: true,
            seoDescription: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });

    return {
      ok: true,
      message: 'Los artículos fueron obtenidos satisfactoriamente',
      articles: articles.map((article) => ({
        id: article.id,
        imageURL: article.imageURL as string,
        author: {
          name: article.author.name!,
          username: article.author.username ?? 'Not provided',
        },
        category: {
          translations: article.category?.translations.map((translation) => ({
            language: translation.language,
            slug: translation.slug,
            name: translation.name,
          })) ?? [],
        },
        seoRobots: article.seoRobots,
        publishedAt: article.publishedAt as Date,
        translations: article.translations.map((translation) => ({
          language: translation.language,
          title: translation.title,
          slug: translation.slug,
          description: translation.description,
          imageAlt: translation.imageAlt,
          seoTitle: translation.seoTitle,
          seoDescription: translation.seoDescription,
        })),
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

