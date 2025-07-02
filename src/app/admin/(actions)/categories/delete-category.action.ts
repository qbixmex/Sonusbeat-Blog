'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategoryAction = async (articleId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: articleId },
  });

  if (!category) {
    return {
      ok: false,
      message: '¡ El articulo no existe !',
    };
  }

  await prisma.category.delete({
    where: { id: articleId },
  });
  
  revalidatePath('/admin/articles');

  return {
    ok: true,
    message: 'La categoría ha sido eliminada 👍',
  };
};

export default deleteCategoryAction;
