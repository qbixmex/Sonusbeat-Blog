import prisma from "@/lib/prisma";
import { Category } from "@/interfaces/category.interface";

type ResponseFetchCategories = {
  ok: boolean;
  message: string;
  categories: Category[] | null;
};

/**
 * Action to fetch categories from the database.
 * @param props - Optional parameters for pagination.
 * @param props.limit - Number of articles to fetch (default is 10).
 * @param props.offset - Offset for pagination (default is 0).
 * @example```
 * // Examples usage:
 * fetchCategoriesAction({ limit: 5 });
 * fetchCategoriesAction({ offset: 10 });
 * fetchCategoriesAction({ limit: 5, offset: 0 });
 * fetchCategoriesAction({ limit: 20, offset: 10 });
 * ```
 * @returns Response containing the categories or an error message.
 */
export const fetchCategoriesAction = async (props?: {
  limit?: number;
  offset?: number;
}): Promise<ResponseFetchCategories> => {
  const { limit, offset } = props ?? { limit: 10, offset: 0 };

  try {
    const data = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return {
      ok: true,
      message: 'Las categorías fueron obtenidas satisfactoriamente',
      categories: data.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching categories");
      return {
        ok: false,
        message: error.message,
        categories: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: "Error inesperado al obtener los artículos, revise los logs del servidor",
      categories: null,
    };
  }
};

export default fetchCategoriesAction;
