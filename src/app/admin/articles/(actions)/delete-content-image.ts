'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import deleteImage from "./delete-image.action";
import { ArticleImage } from "@/interfaces/article.interface";

type DeleteContentImageResponse = {
  ok: boolean;
  message: string;
  articleImages?: ArticleImage[];
};

export const deleteContentImageAction = async (
  articleId: string,
  publicId: string,
): Promise<DeleteContentImageResponse> => {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
      articleImages: {
        select: {
          publicId: true,
          imageUrl: true,
        },
      },
      category: {
        select: {
          translations: {
            select: {
              language: true,
              slug: true,
            },
          },
        },
      },
      translations: {
        select: {
          language: true,
          slug: true,
        },
      },
    },
  });

  if (!article) {
    return {
      ok: false,
      message: '¡ El articulo no existe !',
    };
  }

  if (article.articleImages.length === 0) {
    return {
      ok: false,
      message: '¡ No hay imágenes para eliminar !',
    };
  }

  // Get the image URL before deleting the record
  const imageToDelete = article.articleImages.find((articleImage) => {
    return articleImage.publicId === publicId;
  });

  if (!imageToDelete) {
    return {
      ok: false,
      message: `¡ La imagen con el Public ID ${publicId} no existe !`,
    };
  }

  // Delete from database first
  await prisma.$transaction(async (transaction) => {
    // Remove from ArticleImage table
    await transaction.articleImage.deleteMany({
      where: { publicId },
    });
  });

  await deleteImage(publicId);

  const updatedArticle = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      articleImages: {
        select: {
          publicId: true,
          imageUrl: true,
        },
      },
    },
  });

  article.category?.translations.forEach((categoryTranslation) => {
    article.translations.forEach((articleTranslation) => {
      if (articleTranslation.language === categoryTranslation.language) {
        revalidatePath(`/${categoryTranslation.slug}/${articleTranslation.slug}`);
      }
    });
  });
  revalidatePath(`/admin/articles/${article.id}`);
  revalidatePath(`/admin/articles/${article.id}/edit`);

  return {
    ok: true,
    message: 'La imagen del contenido ha sido eliminada 👍',
    articleImages: updatedArticle?.articleImages ?? [],
  };
};

export default deleteContentImageAction;
