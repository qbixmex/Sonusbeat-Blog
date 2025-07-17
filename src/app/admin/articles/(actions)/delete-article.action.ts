'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

  // Delete image from cloudinary.
  if (articleDeleted.imagePublicID) {
    await deleteImage(articleDeleted.imagePublicID);
  }

  revalidatePath('/admin/articles');

  return {
    ok: true,
    message: 'El artículo ha sido eliminado 👍',
  };
};

export default deleteArticleAction;
