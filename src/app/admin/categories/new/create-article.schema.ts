import z from "zod";

export const createCategorySchema = z.object({
  translations: z.array(
    z.object({
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
    })
  ).min(1, "Debe haber al menos una traducción"),
});
