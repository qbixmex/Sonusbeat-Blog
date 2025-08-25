import prisma from "@/lib/prisma";
import { Pagination } from "@/interfaces/pagination.interface";

type Options = Readonly<{
  page?: number;
  take?: number;
}>;

export type AdminArticle = {
  id: string;
  category: {
    id: string;
    translations: {
      id: string;
      language: string;
      name: string;
      slug: string;
    }[];
  };
  author: {
    id: string;
    name: string;
  };
  imageURL: string | null;
  seoRobots: string | null;
  published: boolean;
  translations: {
    language: string;
    title: string;
    imageAlt: string;
  }[];
};

type ResponseFetchArticles = Promise<{
  ok: boolean;
  message: string;
  articles: AdminArticle[] | null;
  pagination: Pagination | null;
}>;

/**
 * Action to fetch articles from the database.
 * @param props - Optional parameters for pagination.
 * @param props.page - Page number (default is 1).
 * @param props.take - Number of articles to fetch (default is 12).
 * @example```
 * // Examples usage:
 * fetchArticlesAction(); // Uses defaults
 * fetchArticlesAction({ page: 4 });
 * fetchArticlesAction({ take: 10 });
 * fetchArticlesAction({ page: 2, take: 24 });
 * ```
 * @returns Response containing the articles with pagination otherwise error message.
 */
export const fetchArticlesAction = async (options?: Options): ResponseFetchArticles => {
  let { page = 1, take = 12 } = options ?? {};

  // In case is an invalid number like (x)
  if (isNaN(page)) page = 1;
  if (isNaN(take)) take = 12;

  // Negative numbers are not allowed
  if (page <= 0) page = 1;

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        imageURL: true,
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
            translations: {
              select: {
                id: true,
                language: true,
                name: true,
                slug: true,
              }
            }
          }
        },
        translations: {
          select: {
            language: true,
            title: true,
            imageAlt: true,
          }
        }
      },
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.article.count();

    return {
      ok: true,
      message: 'Los artículos fueron obtenidos satisfactoriamente',
      articles: articles.map((article) => ({
        id: article.id,
        imageURL: article.imageURL as string,
        author: {
          id: article.author.id,
          name: article.author.name!,
        },
        category: {
          id: article.category?.id as string,
          translations: article.category?.translations ?? [],
        },
        seoRobots: article.seoRobots,
        published: article.published,
        translations: article.translations,
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / take),
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching articles");
      return {
        ok: false,
        message: error.message,
        articles: null,
        pagination: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: "Error inesperado al obtener los artículos, revise los logs del servidor",
      articles: null,
      pagination: null,
    };
  }
};

export default fetchArticlesAction;
