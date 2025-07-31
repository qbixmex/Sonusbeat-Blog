'use server';

import { revalidatePath } from "next/cache";
import editFormSchema from "../../articles/[id]/edit/edit-article.schema";
import prisma from "@/lib/prisma";
import { Article } from "@/interfaces/article.interface";
import deleteImage from "./delete-image.action";
import uploadImage from "./upload-image.action";
import z from "zod";

type EditArticleResponse = {
  ok: boolean;
  message: string;
  article: Article | null;
};

type UpdateArticleInput = z.infer<typeof editFormSchema>;

export const updateArticleAction = async (
  formData: FormData,
  articleId: string,
  authenticatedUserId: string,
): Promise<EditArticleResponse> => {
  if (!authenticatedUserId) {
    return {
      ok: false,
      message: 'El usuario no está autenticado, ¡ Revise su sesión !',
      article: null,
    };
  }

  const translationsRaw = formData.get("translations") as string | null;

  let translations: UpdateArticleInput["translations"] = [];

  if (translationsRaw) {
    try {
      translations = JSON.parse(translationsRaw);
    } catch {
      translations = [];
    }
  }

  const rawData = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    categoryId: formData.get("categoryId") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as File,
    imageAlt: formData.get("imageAlt") as string,
    seoTitle: formData.get("seoTitle") as string,
    seoDescription: formData.get("seoDescription") as string,
    seoRobots: formData.get("seoRobots") as string,
    published: ((formData.get("published") as string) === "true") ? true : false,
    publishedAt: new Date(formData.get("publishedAt") as string),
    translations: translations.map((translation) => ({
      language: translation.language.trim(),
      title: translation.title.trim(),
      description: translation.description.trim(),
      slug: translation.slug.trim(),
      content: translation.content.trim(),
      imageAlt: translation.imageAlt ? translation.imageAlt.trim() : "",
      seoTitle: translation.seoTitle.trim(),
      seoDescription: translation.seoDescription.trim(),
    })),
  };

  const articleParsed = editFormSchema.safeParse(rawData);

  if (!articleParsed.success) {
    return {
      ok: false,
      message: articleParsed.error.errors[0].message,
      article: null,
    };
  }

  const { image, ...articleToSave } = articleParsed.data;

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
            title: articleToSave.title,
            slug: articleToSave.slug,
            categoryId: articleToSave.categoryId,
            description: articleToSave.description,
            content: articleToSave.content,
            imageAlt: articleToSave.imageAlt ?? '',
            seoTitle: articleToSave.seoTitle,
            seoDescription: articleToSave.seoDescription,
            seoRobots: articleToSave.seoRobots,
            publishedAt: articleToSave.publishedAt as Date,
            published: articleToSave.published,
            translations: {
              upsert: articleToSave.translations?.map((translation) => ({
                where: {
                  articleId_language: {
                    articleId: articleId,
                    language: translation.language,
                  }
                },
                update: {
                  ...translation,
                  language: undefined,
                },
                create: {
                  ...translation,
                  imageAlt: translation.imageAlt as string,
                },
              })),
            },
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
            translations: true,
          },
        });

        if (image) {
          // Delete previous image from cloudinary.
          if (updatedArticle.imagePublicID) {
            const response = await deleteImage(updatedArticle.imagePublicID);
            if (!response.ok) {
              throw 'Error deleting image from cloudinary';
            }
          }

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

        // Revalidate Paths
        revalidatePath('/');
        revalidatePath(`/${updatedArticle.category?.slug}/${updatedArticle.slug}`);

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
            translations: updatedArticle.translations,
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
