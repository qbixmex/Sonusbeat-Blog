'use server';

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import deleteImage from "./delete-image.action";

export const deleteArticleAction = async (articleId: string) => {
  const articleDeleted = await prisma.article.findUnique({
    where: { id: articleId },
    select: {
      imagePublicID: true,
      published: true,
    },
  });

  if (!articleDeleted) {
    return {
      ok: false,
      message: '¡ El articulo no existe !',
    };
  }

  await prisma.article.delete({
    where: { id: articleId },
  });

  // Delete previous image from cloudinary.
  if (articleDeleted.imagePublicID) {
    const response = await deleteImage(articleDeleted.imagePublicID);
    if (!response.ok) {
      throw 'Error deleting image from cloudinary';
    }
  }

  revalidateTag('public-articles');
  revalidatePath('/admin/articles');

  return {
    ok: true,
    message: 'El artículo ha sido eliminado 👍',
  };
};

export default deleteArticleAction;
