'use server';

import { revalidatePath } from "next/cache";
import editFormSchema from "../../articles/[id]/edit/edit-article.schema";
import prisma from "@/lib/prisma";
import { Article } from "@/interfaces/article.interface";
import deleteImage from "./delete-image.action";
import uploadImage from "./upload-image.action";

type EditArticleResponse = {
  ok: boolean;
  message: string;
  article: Article | null;
};

export const updateArticleAction = async (
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

  const { image, ...eventToSave } = articleParsed.data;

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
            title: eventToSave.title,
            slug: eventToSave.slug,
            categoryId: eventToSave.categoryId,
            description: eventToSave.description,
            content: eventToSave.content,
            imageAlt: eventToSave.imageAlt ?? '',
            seoTitle: eventToSave.seoTitle,
            seoDescription: eventToSave.seoDescription,
            seoRobots: eventToSave.seoRobots,
            publishedAt: eventToSave.publishedAt as Date,
            published: eventToSave.published,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        });

        if (image) {
          // Delete previous image from cloudinary.
          const response = await deleteImage(updatedArticle.imagePublicID ?? '');

          if (!response.ok) {
            throw 'Error deleting image from cloudinary';
          }

          console.log("SE SUPONE QUE SE DEBE SUBIR UNA NUEVA IMAGEN");

          // Upload Image to third-party storage (cloudinary).
          const imageUploaded = await uploadImage(image, 'articles');

          if (!imageUploaded) {
            throw 'Error uploading image to cloudinary';
          }

          // Update event with new image.
          await transaction.article.update({
            where: { id: articleId },
            data: {
              imageURL: imageUploaded.secureUrl,
              imagePublicID: imageUploaded.publicId,
            },
          });

          // Update event object to return.
          updatedArticle.imageURL = imageUploaded.secureUrl;
        }

        return {
          ok: true,
          message: 'Artículo actualizado 👍',
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
            category: {
              id: updatedArticle.category?.id as string,
              name: updatedArticle.category?.name as string,
              slug: updatedArticle.category?.slug as string,
            },
            imageURL: updatedArticle.imageURL ?? 'no-image.png',
            imagePublicID: updatedArticle.imagePublicID ?? '',
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
      } catch (error) {
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

export default updateArticleAction;
