'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import deleteImage from "./delete-image.action";

type DeleteContentImageResponse = {
  ok: boolean;
  message: string;
  images?: string[];
};

export const deleteContentImageAction = async (
  articleId: string,
  publicImageUrl: string,
): Promise<DeleteContentImageResponse> => {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      id: true,
      images: true,
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

  if (article.images.length === 0) {
    return {
      ok: false,
      message: '¡ No hay imágenes para eliminar !',
    };
  }

  const filteredImages = article.images.filter((image: string) => {
    return image !== publicImageUrl;
  });

  await prisma.article.update({
    where: { id: articleId },
    data: {
      images: {
        set: filteredImages,
      },
    },
  });

  // Delete the image using the public ID
  if (publicImageUrl.startsWith("https://")) {
    const segments = publicImageUrl.split("/");
    const folder = segments[segments.length - 2];
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    const publicId = `${folder}/${imageId}`;
    await deleteImage(publicId);
  }

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
    images: filteredImages,
  };
};

export default deleteContentImageAction;
