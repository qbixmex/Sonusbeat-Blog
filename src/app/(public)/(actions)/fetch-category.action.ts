import { PublicCategoryForHomePage } from "@/interfaces/category.interface";
import prisma from "@/lib/prisma";

type ResponseFetchCategories = {
  ok: boolean;
  message: string;
  category: PublicCategoryForHomePage | null;
};

/**
 * Action to fetch categories from the database.
 * 
 * @param categorySlug- The slug of the category to fetch.
 * @example```
 * // Examples usage:
 * fetchPublicCategoriesAction('music');
 * fetchPublicCategoriesAction('entretenimiento');
 * ```
 * @returns Response containing the categories or an error message.
 */
export const fetchPublicCategoryAction = async (categorySlug: string): Promise<ResponseFetchCategories> => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        translations: {
          some: { slug: categorySlug },
        },
      },
      select: {
        translations: {
          select: {
            language: true,
            name: true,
            slug: true,
          },
        },
      }
    });

    return {
      ok: true,
      message: 'Las categoría fue obtenida satisfactoriamente',
      category,
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching categories");
      return {
        ok: false,
        message: error.message,
        category: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: "Error inesperado al obtener las categorías, revise los logs del servidor",
      category: null,
    };
  }
};

export default fetchPublicCategoryAction;

