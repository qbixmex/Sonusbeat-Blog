"use server";

import prisma from "@/lib/prisma";

import { createFormSchema } from "./create-article.schema";
import { revalidatePath } from "next/cache";

export const createArticleAction = async (
  formData: FormData,
  authenticatedUserId: string,
) => {
  if (!authenticatedUserId) {
    return {
      ok: false,
      message: 'El usuario no está autenticado, ¡ Revise su sesión !',
      user: null,
    };
  }

  const rawData = Object.fromEntries(formData);

  const articleParsed = createFormSchema.safeParse({
    ...rawData,
    publishedAt: new Date(rawData.publishedAt as string),
    published: rawData.published === 'true' ? true : false,
  });

  if (!articleParsed.success) {
    return {
      ok: false,
      message: articleParsed.error.errors[0].message,
      user: null,
    };
  }

  const data = articleParsed.data;

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {
      const createdArticle = await transaction.article.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          categoryId: data.categoryId,
          content: data.content,
          image: data.image,
          imageAlt: data.imageAlt,
          authorId: authenticatedUserId,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          seoRobots: data.seoRobots,
          publishedAt: data.publishedAt,
          published: data.published,
        },
      });

      return {
        ok: true,
        message: 'Artículo Creado 👍',
        user: createdArticle,
      };
    });

    // Revalidate Paths
    revalidatePath('/admin/users');

    return prismaTransaction;
  } catch (error) {
    if (error instanceof Error && 'meta' in error && error.meta) {
      if ('code' in error && error.code as string === 'P2002') {
        const fieldError = (error.meta as { modelName: string; target: string[] }).target[0];
        return {
          ok: false,
          message: `¡ El campo "${fieldError}", está duplicado !`,
          user: null,
        };
      }

      return {
        ok: false,
        message: '¡ Error al crear el artículo, revise los logs del servidor !',
        user: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: '¡ Error inesperado, revise los logs del servidor !',
      user: null,
    };
  }
};

export default createArticleAction;
