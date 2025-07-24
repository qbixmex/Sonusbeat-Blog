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
 * ```
 * @returns Response object containing the status, message, and article data.
 */
export const fetchPublicArticleAction = async (slug: string): Promise<ResponseFetchArticles> => {
  try {
    const data = await prisma.article.findUnique({
      where: {
        slug,
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
            name: true,
            slug: true,
          }
        },
        seoTitle: true,
        seoDescription: true,
        seoRobots: true,
        publishedAt: true,
      },
    });

    return {
      ok: true,
      message: 'Los artículos fueron obtenidos satisfactoriamente',
      article: {
        id: data?.id as string,
        title: data?.title as string,
        slug: data?.slug as string,
        imageURL: data?.imageURL as string,
        imageAlt: data?.imageAlt as string,
        description: data?.description as string,
        content: data?.content as string,
        author: {
          name: data?.author.name as string,
          username: data?.author.username as string,
        },
        category: {
          name: data?.category?.name as string,
          slug: data?.category?.slug as string,
        },
        seoTitle: data?.seoTitle as string,
        seoDescription: data?.seoDescription as string,
        seoRobots: data?.seoRobots as Robots,
        publishedAt: data?.publishedAt as Date,
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

