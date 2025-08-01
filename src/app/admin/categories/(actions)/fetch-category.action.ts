import { Category } from "@/interfaces/category.interface";
import prisma from "@/root/src/lib/prisma";

type FetchCategoryResponse = {
  ok: boolean;
  message: string;
  category: Category | null;
}

export const fetchCategoryAction = async (categoryId: string): Promise<FetchCategoryResponse> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { translations: true },
    });

    if (!category) {
      return {
        ok: false,
        message: "¡ La categoría no se encuentra !",
        category: null,
      };
    }

    return {
      ok: true,
      message: "Categoría obtenida correctamente 👍",
      category: {
        id: category.id,
        translations: category.translations,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        ok: false,
        message: "No se pudo obtener la categoría,\n¡ Revise los logs del servidor !",
        category: null,
      };
    }
    return {
      ok: false,
      message: "Error inesperado del servidor,\n¡ Revise los logs del servidor !",
      category: null,
    };
  }
};

export default fetchCategoryAction;
