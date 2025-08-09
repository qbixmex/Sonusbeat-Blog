import z from "zod";

const robots = [
  "index_follow",
  "noindex_follow",
  "index_nofollow",
  "noindex_nofollow"
] as const;

export const editFormSchema = z.object({
  title: z
    .string({
      message: "El título debe ser un string",
    })
    .trim()
    .min(8, "El título debe ser por lo menos de 8 caracteres")
    .max(250, "El título debe ser máximo 250 caracteres"),
  description: z
    .string({
      message: "La descripción debe ser un string",
    })
    .min(8, "La descripción debe ser por lo menos de 8 caracteres")
    .max(250, "La descripción debe ser máximo 250 caracteres"),
  content: z
    .string({ message: "El contenido debe ser un string" })
    .min(8, "El contenido debe ser por lo menos de 8 caracteres"),
  category: z
    .string({ message: "La categoría debe ser un string" })
    .trim()
    .min(3, "La categoría debe ser por lo menos de 3 caracteres")
    .max(50, "La descripción debe ser máximo 100 caracteres"),
  image: z
    .string({ message: "La imagen debe ser un string" })
    .min(7, "La imagen debe ser por lo menos de 3 caracteres")
    .optional(),
  imageAlt: z
    .string({ message: "El author seo debe ser un string" })
    .min(3, "El author seo debe ser por lo menos de 3 caracteres")
    .optional(),
  seoTitle: z
    .string({ message: "El título seo debe ser un string" })
    .trim()
    .min(8, "El título seo debe ser por lo menos de 8 caracteres")
    .max(70, "El título seo debe ser máximo 70 caracteres"),
  seoDescription: z
    .string({ message: "La descripción seo debe ser un string" })
    .trim()
    .min(8, "La descripción seo debe ser por lo menos de 8 caracteres")
    .max(160, "La descripción seo debe ser máximo 160 caracteres"),
  seoRobots: z
    .enum(robots, {
      message: "Los robots seo debe ser uno de los valores permitidos",
    }),
  publishedAt: z
    .date({ message: "La fecha de publicación debe ser una fecha válida" })
    .optional(),
  published: z
    .boolean({ message: "El estado de publicación debe ser un booleano" })
    .optional(),
});