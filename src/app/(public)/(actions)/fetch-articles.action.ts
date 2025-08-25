import { PublicArticleForHomePage } from "@/interfaces/article.interface";
import prisma from "@/lib/prisma";
import type { Pagination } from "@/interfaces/pagination.interface";

type Options = Readonly<{
  page?: number;
  take?: number;
  category?: string;
}>;

export type ResponseFetchArticles = {
  ok: boolean;
  message: string;
  articles: PublicArticleForHomePage[] | null;
  pagination: Pagination | null;
};

/**
 * Fetches articles from the database with caching support.
 * 
 * @param options - Configuration object for the query
 * @param options.page - Page number for pagination (default: 1)
 * @param options.take - Number of articles per page (default: 12)  
 * @param options.category - Optional category slug to filter by
 * 
 * @returns Promise containing articles and pagination info
 * 
 * @example
 * ```typescript
 * // Fetch first page with default settings (page 1, 12 articles)
 * const result = await fetchPublicArticlesAction({});
 * 
 * // Fetch specific page with default take
 * const result = await fetchPublicArticlesAction({ page: 2 });
 * 
 * // Fetch with custom page size
 * const result = await fetchPublicArticlesAction({ page: 1, take: 24 });
 * 
 * // Fetch specific page with custom size
 * const result = await fetchPublicArticlesAction({ page: 3, take: 6 });
 * 
 * // Filter by category (all articles from 'technology' category)
 * const result = await fetchPublicArticlesAction({ category: 'technology' });
 * 
 * // Combined: page 2, 10 articles, from 'music' category
 * const result = await fetchPublicArticlesAction({ 
 *   page: 2, 
 *   take: 10, 
 *   category: 'music' 
 * });
 * 
 * // Usage in component
 * const response = use(fetchPublicArticlesAction({
 *   page: parseInt(page ?? '1'),
 *   take: parseInt(take ?? '12'),
 * }));
 * const articles = response.articles ?? [];
 * ```
 */
export const fetchPublicArticlesAction = async (options: Options): Promise<ResponseFetchArticles> => {
  let { page = 1, take = 12 } = options ?? {};

  // In case is an invalid number like (x)
  if (isNaN(page)) page = 1;
  if (isNaN(take)) take = 12;

  // Negative numbers are not allowed
  if (page <= 0) page = 1;

  try {
    const articles = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
      where: {
        published: true,
        category: options.category
          ? { translations: { some: { slug: options.category } } }
          : undefined
      },
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
          name: article.author.name!,
          username: article.author.username ?? 'Not provided',
        },
        category: {
          translations: article.category?.translations.map((translation) => ({
            language: translation.language,
            name: translation.name,
            slug: translation.slug,
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
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / take),
      },
    }
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

export default fetchPublicArticlesAction;
