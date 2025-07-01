'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

type UpdateArticleStatusResponse = {
  ok: boolean;
  message: string;
};

export const updateArticleStateAction = async (
  articleId: string,
): Promise<UpdateArticleStatusResponse> => {

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

  await prisma.article.update({
    where: { id: articleId },
    data: { published: !article.published },
  });
  
  revalidatePath('/admin/articles');

  return {
    ok: true,
    message: '¡ El artículo actualizado !',
  };

};

export default updateArticleStateAction;
