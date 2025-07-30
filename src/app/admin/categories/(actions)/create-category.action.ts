"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import z from "zod";

const translationSchema = z.object({
  language: z
    .string({
      required_error: "El idioma es obligatorio",
      invalid_type_error: "El idioma debe ser un string",
    })
    .trim()
    .min(2, "El idioma debe ser por lo menos de 2 caracteres")
    .max(2, "El idioma debe ser máximo 2 caracteres"),
  name: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un string",
    })
    .trim()
    .min(3, "El nombre debe ser por lo menos de 3 caracteres")
    .max(255, "El nombre debe ser máximo 255 caracteres"),
  slug: z
    .string({
      required_error: "El slug es obligatorio",
      invalid_type_error: "El slug debe ser un string",
    })
    .trim()
    .min(3, "El slug debe ser por lo menos de 3 caracteres")
    .max(255, "El slug debe ser máximo 255 caracteres"),
});

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
  translations: z.array(translationSchema).min(1, "Debe haber al menos una traducción"),
});

type CreateCategoryInput = z.infer<typeof createFormSchema>;

export const createCategoryAction = async (formData: FormData) => {
  const rawData: CreateCategoryInput = {
    name: "",
    slug: "",
    translations: [],
  };

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const translationsRaw = formData.get("translations") as string | null;

  let translations: CreateCategoryInput["translations"] = [];

  if (translationsRaw) {
    try {
      translations = JSON.parse(translationsRaw);
    } catch {
      translations = [];
    }
  }

  rawData.name = name.trim();
  rawData.slug = slug.trim();
  rawData.translations = translations.map((translation) => ({
    language: translation.language.trim(),
    name: translation.name.trim(),
    slug: translation.slug.trim(),
  }));

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
          translations: {
            create: data.translations.map((translation) => ({
              language: translation.language,
              name: translation.name,
              slug: translation.slug,
            })),
          },
        },
        include: {
          translations: true,
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
