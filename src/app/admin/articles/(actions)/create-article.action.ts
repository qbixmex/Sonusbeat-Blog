"use server";

import prisma from "@/lib/prisma";

import { createFormSchema } from "./create-article.schema";
import { revalidatePath } from "next/cache";
import uploadImage from "./upload-image.action";

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

  const { image, ...articleToSave } = articleParsed.data;

  // Upload Image to third-party storage (cloudinary).
  const imageUploaded = await uploadImage(image!, 'articles');

  if (!imageUploaded) {
    throw 'Error uploading image to cloudinary';
  }

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {
      const createdArticle = await transaction.article.create({
        data: {
          title: articleToSave.title,
          slug: articleToSave.slug,
          description: articleToSave.description,
          categoryId: articleToSave.categoryId,
          content: articleToSave.content,
          imageURL: imageUploaded.secureUrl,
          imagePublicID: imageUploaded.publicId,
          imageAlt: articleToSave.imageAlt,
          authorId: authenticatedUserId,
          seoTitle: articleToSave.seoTitle,
          seoDescription: articleToSave.seoDescription,
          seoRobots: articleToSave.seoRobots,
          publishedAt: articleToSave.publishedAt,
          published: articleToSave.published,
        },
      });

      return {
        ok: true,
        message: 'Artículo Creado 👍',
        article: {
          id: createdArticle.id,
          title: createdArticle.title,
          slug: createdArticle.slug,
          description: createdArticle.description,
          categoryId: createdArticle.categoryId,
          content: createdArticle.content,
          imageURL: imageUploaded.secureUrl,
          imagePublicID: imageUploaded.publicId,
          imageAlt: createdArticle.imageAlt,
          authorId: authenticatedUserId,
          seoTitle: createdArticle.seoTitle,
          seoDescription: createdArticle.seoDescription,
          seoRobots: createdArticle.seoRobots,
          publishedAt: createdArticle.publishedAt,
          published: createdArticle.published,
          createdAt: createdArticle.createdAt,
          updatedAt: createdArticle.updatedAt,
        },
      };
    });

    // Revalidate Paths
    revalidatePath('/');
    revalidatePath('/admin/articles');

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
