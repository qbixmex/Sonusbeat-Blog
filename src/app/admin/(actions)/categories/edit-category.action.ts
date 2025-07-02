'use server';

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Category } from "@/interfaces/category.interface";
import z from "zod";

const editFormSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un string",
    })
    .trim()
    .min(3, "El nombre debe ser por lo menos de 3 caracteres")
    .max(250, "El nombre debe ser máximo 250 caracteres")
    .optional(),
  slug: z
    .string({
      required_error: "El slug es obligatorio",
      invalid_type_error: "El slug debe ser un string",
    })
    .trim()
    .min(3, "El slug debe ser por lo menos de 3 caracteres")
    .max(250, "El slug debe ser máximo 250 caracteres")
    .optional(),
});

type EditCategoryResponse = {
  ok: boolean;
  message: string;
  category: Category | null;
};

export const editCategoryAction = async (
  formData: FormData,
  categoryId: string,
): Promise<EditCategoryResponse> => {
  const rawData = Object.fromEntries(formData);

  const categoryParsed = editFormSchema.safeParse(rawData);

  if (!categoryParsed.success) {
    return {
      ok: false,
      message: categoryParsed.error.errors[0].message,
      category: null,
    };
  }

  const data = categoryParsed.data;

  try {
    const prismaTransaction = await prisma.$transaction(async (transaction) => {
      try {
        const isCategoryExists = await transaction.category.count({
          where: { id: categoryId },
        });

        if (!isCategoryExists) {
          return {
            ok: false,
            message: '¡ La categoría no existe o ha sido eliminada !',
            category: null,
          };
        }

        const updatedCategory = await transaction.category.update({
          where: { id: categoryId },
          data: {
            name: data.name,
            slug: data.slug,
          },
        });

        return {
          ok: true,
          message: '¡ Artículo actualizado !',
          category: {
            id: updatedCategory.id,
            name: updatedCategory.name,
            slug: updatedCategory.slug,
            createdAt: updatedCategory.createdAt,
            updatedAt: updatedCategory.updatedAt,
          },
        };
      } catch(error) {
        if (error instanceof Error && 'meta' in error && error.meta) {
          if ('code' in error && error.code as string === 'P2002') {
            const fieldError = (error.meta as { modelName: string; target: string[] }).target[0];
            return {
              ok: false,
              message: `¡ El campo "${fieldError}", está duplicado !`,
              category: null,
            };
          }

          return {
            ok: false,
            message: '¡ Error al crear la categoría,\nrevise los logs del servidor !',
            category: null,
          };
        }
        return {
          ok: false,
          message: '¡ Error inesperado, revise los logs !',
          category: null,
        };
      }
    });

    // Revalidate Paths
    revalidatePath('/admin/categories');

    return prismaTransaction;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: '¡ Error inesperado, revise los logs del servidor !',
      category: null,
    };
  }
};

export default editCategoryAction;
