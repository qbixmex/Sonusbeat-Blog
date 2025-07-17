import { Article } from "@/interfaces/article.interface";
import prisma from "@/root/src/lib/prisma";

type FetchArticleResponse = {
  ok: boolean;
  message: string;
  article: Article | null;
}

export const fetchArticleAction = async (articleId: string): Promise<FetchArticleResponse> => {
  try {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id: articleId },
      include: {
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
      }
    });

    return {
      ok: true,
      message: "Artículo obtenido correctamente 👍",
      article: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        description: article.description,
        content: article.content,
        category: {
          id: article?.category?.id as string,
          name: article?.category?.name as string,
          slug: article?.category?.slug as string,
        },
        imageURL: article.imageURL as string,
        imageAlt: article.imageAlt,
        author: {
          id: article.author.id,
          name: article.author.name!,
        },
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        seoRobots: article.seoRobots,
        publishedAt: article.publishedAt as Date,
        published: article.published,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        ok: false,
        message: "No se pudo obtener el artículo,\n¡ Revise los logs del servidor !",
        article: null,
      };
    }
    return {
      ok: false,
      message: "Error inesperado del servidor,\n¡ Revise los logs del servidor !",
      article: null,
    };
  }
};

export default fetchArticleAction;
