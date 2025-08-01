import type { PublicArticle, Robots } from "@/interfaces/article.interface";
import prisma from "@/lib/prisma";

interface PublicArticleWithContent extends PublicArticle {
  content: string;
}

type ResponseFetchArticles = {
  ok: boolean;
  message: string;
  article: PublicArticleWithContent | null;
};

/**
 * Action to fetch articles from the database.
 * @param slug - The slug of the article to fetch.
 * @description This action retrieves a specific article by its slug from the database.
 * @example```typescript
 * fetchPublicArticleAction("how-to-make-a-baseline");
 * fetchPublicArticleAction("como-hace-un-bajo");
 * ```
 * @returns Response object containing the status, message, and article data.
 */
export const fetchPublicArticleAction = async (slug: string, locale: string): Promise<ResponseFetchArticles> => {
  try {
    const article = await prisma.article.findFirst({
      where: {
        translations: { some: { slug }},
        published: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageURL: true,
        imageAlt: true,
        description: true,
        content: true,
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
                name: true,
                slug: true,
              }
            }
          }
        },
        seoTitle: true,
        seoDescription: true,
        seoRobots: true,
        publishedAt: true,
        translations: {
          select: {
            language: true,
            title: true,
            slug: true,
            description: true,
            content: true,
            imageAlt: true,
            seoTitle: true,
            seoDescription: true,
          }
        },
      },
    });

    return {
      ok: true,
      message: 'Los artículos fueron obtenidos satisfactoriamente',
      article: {
        id: article?.id as string,
        title: article?.title as string,
        slug: article?.slug as string,
        imageURL: article?.imageURL as string,
        imageAlt: article?.imageAlt as string,
        description: article?.description as string,
        content: article?.content as string,
        author: {
          name: article?.author.name as string,
          username: article?.author.username as string,
        },
        category: {
          translations: article?.category?.translations ?? [],
        },
        seoTitle: article?.seoTitle as string,
        seoDescription: article?.seoDescription as string,
        seoRobots: article?.seoRobots as Robots,
        publishedAt: article?.publishedAt as Date,
        translation: article?.translations.find(t => t.language === locale) ?? null,
        allTranslations: article?.translations.map(t => ({
          language: t.language,
          slug: t.slug,
        })) ?? [],
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching articles");
      return {
        ok: false,
        message: error.message,
        article: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: "Error inesperado al obtener los artículos, revise los logs del servidor",
      article: null,
    };
  }
};

export default fetchPublicArticleAction;

