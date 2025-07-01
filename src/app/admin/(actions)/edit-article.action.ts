'use server';

import { revalidatePath } from "next/cache";
import { editFormSchema } from "../articles/[id]/edit/edit-article.schema";
import prisma from "@/lib/prisma";
import { createSlug } from "@/lib/utils";
import { Article } from "@/interfaces/article.interface";

type EditArticleResponse = {
  ok: boolean;
  message: string;
  article: Article | null;
};

export const editArticleAction = async (
  formData: FormData,
  articleId: string,
): Promise<EditArticleResponse> => {
  const rawData = Object.fromEntries(formData);

  const articleParsed = editFormSchema.safeParse({
    ...rawData,
    publishedAt: new Date(rawData.publishedAt as string),
    published: rawData.published === 'true' ? true : false,
  });

  if (!articleParsed.success) {
    return {
      ok: false,
      message: articleParsed.error.errors[0].message,
      article: null,
    };
  }

  const data = articleParsed.data;

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {
      try {
        const isArticleExists = await transaction.article.count({
          where: { id: articleId },
        });

        if (!isArticleExists) {
          return {
            ok: false,
            message: '¡ El artículo no existe o ha sido eliminado !',
            article: null,
          };
        }

        const updatedArticle = await transaction.article.update({
          where: { id: articleId },
          data: {
            title: data.title,
            slug: createSlug(data.title),
            description: data.description,
            content: data.content,
            image: data.image ?? 'no-image.png',
            imageAlt: data.imageAlt ?? '',
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            seoRobots: data.seoRobots,
            publishedAt: data.publishedAt as Date,
            published: data.published,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            }
          },
        });

        return {
          ok: true,
          message: '¡ Artículo actualizado !',
          article: {
            id: updatedArticle.id,
            title: updatedArticle.title,
            slug: updatedArticle.slug,
            description: updatedArticle.description,
            content: updatedArticle.content,
            author: {
              id: updatedArticle.author.id,
              name: updatedArticle.author.name!,
            },
            category: 'Pending',
            image: updatedArticle.image ?? 'no-image.png',
            imageAlt: updatedArticle.imageAlt ?? '',
            seoTitle: updatedArticle.seoTitle,
            seoDescription: updatedArticle.seoDescription,
            seoRobots: updatedArticle.seoRobots,
            publishedAt: updatedArticle.publishedAt as Date,
            published: updatedArticle.published,
            createdAt: updatedArticle.createdAt,
            updatedAt: updatedArticle.updatedAt,
          },
        };
      } catch(error) {
        if (error instanceof Error && 'meta' in error && error.meta) {
          if ('code' in error && error.code as string === 'P2002') {
            const fieldError = (error.meta as { modelName: string; target: string[] }).target[0];
            return {
              ok: false,
              message: `¡ El campo "${fieldError}", está duplicado !`,
              article: null,
            };
          }

          return {
            ok: false,
            message: '¡ Error al crear el artículo, revise los logs del servidor !',
            article: null,
          };
        }
        return {
          ok: false,
          message: '¡ Error inesperado, revise los logs !',
          article: null,
        };
      }
    });

    // Revalidate Paths
    revalidatePath('/admin/users');

    return prismaTransaction;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: '¡ Error inesperado, revise los logs del servidor !',
      article: null,
    };
  }
};

export default editArticleAction;
