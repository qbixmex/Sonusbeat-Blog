import z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
];
const robots = [
  "index_follow",
  "noindex_follow",
  "index_nofollow",
  "noindex_nofollow"
] as const;

export const formSchema = z.object({
  categoryId: z
    .string({ message: "La categoría debe ser un string" })
    .trim()
    .min(3, "La categoría debe ser por lo menos de 3 caracteres")
    .max(50, "La descripción debe ser máximo 100 caracteres"),
  image: z
    .instanceof(File, { message: "La imagen debe ser un archivo" })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, 'El tamaño máximo de la imagen deber ser menor a 1MB')
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), `El tipo de archivo debe ser uno de los siguientes: ${ACCEPTED_FILE_TYPES.join(', ')}`)
    .nullable()
    .optional(),
  seoRobots: z
    .enum(robots, {
      message: "El valor de robots debe ser uno de los siguientes: " + robots.join(', '),
    }),
  publishedAt: z
    .date({ message: "La fecha de publicación debe ser una fecha válida" })
    .optional(),
  published: z
    .boolean({ message: "El estado de publicación debe ser un booleano" })
    .optional(),
  translations: z.array(
    z.object({
      language: z
        .string({ message: "El idioma debe ser un string" })
        .trim()
        .min(2, "El idioma debe ser por lo menos de 2 caracteres")
        .max(2, "El idioma debe ser máximo 2 caracteres"),
      title: z
        .string({ message: "El título debe ser un string" })
        .trim()
        .min(3, "El título debe ser por lo menos de 3 caracteres")
        .max(255, "El título debe ser máximo 255 caracteres"),
      slug: z
        .string({ message: "El slug debe ser un string" })
        .trim()
        .min(3, "El slug debe ser por lo menos de 3 caracteres")
        .max(255, "El slug debe ser máximo 255 caracteres"),
      description: z
        .string({ message: "La descripción debe ser un string" })
        .trim()
        .min(8, "La descripción debe ser por lo menos de 8 caracteres")
        .max(255, "La descripción debe ser máximo 255 caracteres"),
      content: z
        .string({ message: "El contenido debe ser un string" })
        .min(8, "El contenido debe ser por lo menos de 8 caracteres"),
      imageAlt: z
        .string({ message: "El texto alternativo de la imagen es obligatorio" })
        .min(3, "El texto alternativo de la imagen debe ser por lo menos de 3 caracteres")
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
    }),
  ),
});

export default formSchema;
