"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import z from "zod";

const createFormSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un string",
    })
    .trim()
    .min(3, "El nombre debe ser por lo menos de 3 caracteres")
    .max(250, "El nombre debe ser máximo 250 caracteres"),
  slug: z
    .string({
      required_error: "El slug es obligatorio",
      invalid_type_error: "El slug debe ser un string",
    })
    .trim()
    .min(3, "El slug debe ser por lo menos de 3 caracteres")
    .max(250, "El slug debe ser máximo 250 caracteres"),
});


export const createCategoryAction = async (formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const categoryParsed = createFormSchema.safeParse(rawData);

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
      const createdCategory = await transaction.category.create({
        data: {
          name: data.name,
          slug: data.slug,
        },
      });

      return {
        ok: true,
        message: 'La categoría ha sido creada satisfactoriamente',
        user: createdCategory,
      };
    });

    // Revalidate Paths
    revalidatePath('/admin/categories');

    return prismaTransaction;
  } catch (error) {
    if (error instanceof Error && 'meta' in error && error.meta) {
      if ('code' in error && error.code as string === 'P2002') {
        const fieldError = (error.meta as { modelName: string; target: string[] }).target[0];
        return {
          ok: false,
          message: `¡ El campo "${fieldError}", está duplicado !`,
          user: null,
        };
      }

      return {
        ok: false,
        message: '¡ Error al crear la categoría, revise los logs del servidor !',
        user: null,
      };
    }
    console.log(error);
    return {
      ok: false,
      message: '¡ Error inesperado, revise los logs del servidor !',
      user: null,
    };
  }
};

export default createCategoryAction;
