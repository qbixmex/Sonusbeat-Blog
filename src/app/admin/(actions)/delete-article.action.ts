'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticleAction = async (articleId: string) => {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { published: true },
  });

  if (!article) {
    return {
      ok: false,
      message: '¡ El articulo no existe !',
    };
  }

  await prisma.article.delete({
    where: { id: articleId },
  });
  
  revalidatePath('/admin/articles');

  return {
    ok: true,
    message: 'El artículo ha sido eliminado 👍',
  };
};

export default deleteArticleAction;
