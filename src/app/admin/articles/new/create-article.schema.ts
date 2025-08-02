import z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
];

export const formSchema = z.object({
  categoryId: z
    .string({
      required_error: "¡ La categoría es obligatoria !",
      invalid_type_error: "El id de la categoría debe ser un string",
    }),
  image: z
    .instanceof(File, { message: "La imagen debe ser un archivo" })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'El tamaño máximo de la imagen deber ser menor a 1MB')
    .refine((file) => {
      return file && ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'El tipo de archivo debe ser uno de los siguientes: png, jpeg, jpg, gif, webp'),
  seoRobots: z
    .enum([
      "index_follow",
      "noindex_follow",
      "index_nofollow",
      "noindex_nofollow"
    ], {
      required_error: "Los robots seo es obligatorio",
      invalid_type_error: "Los robots seo debe ser uno de los valores permitidos",
    }),
  publishedAt: z
    .date({
      required_error: "La fecha de publicación es obligatoria",
      invalid_type_error: "La fecha de publicación debe ser una fecha válida",
    })
    .optional(),
  published: z
    .boolean({
      required_error: "El estado de publicación es obligatorio",
      invalid_type_error: "El estado de publicación debe ser un booleano",
    })
    .optional(),
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
      title: z
        .string({
          required_error: "El título es obligatorio",
          invalid_type_error: "El título debe ser un string",
        })
        .trim()
        .min(3, "El título debe ser por lo menos de 3 caracteres")
        .max(255, "El título debe ser máximo 255 caracteres"),
      slug: z
        .string({
          required_error: "El slug es obligatorio",
          invalid_type_error: "El slug debe ser un string",
        })
        .trim()
        .min(3, "El slug debe ser por lo menos de 3 caracteres")
        .max(255, "El slug debe ser máximo 255 caracteres"),
      description: z
        .string({
          required_error: "La descripción es obligatorio",
          invalid_type_error: "La descripción debe ser un string",
        })
        .trim()
        .min(8, "La descripción debe ser por lo menos de 8 caracteres")
        .max(255, "La descripción debe ser máximo 255 caracteres"),
      content: z
        .string({
          required_error: "El contenido es obligatorio",
          invalid_type_error: "El contenido debe ser un string",
        })
        .min(8, "El contenido debe ser por lo menos de 8 caracteres"),
      imageAlt: z
        .string({
          invalid_type_error: "El texto alternativo de la imagen debe ser un string",
          required_error: "El texto alternativo de la imagen es obligatorio",
        })
        .min(3, "El texto alternativo de la imagen debe ser por lo menos de 3 caracteres")
        .optional(),
      seoTitle: z
        .string({
          required_error: "El título seo es obligatorio",
          invalid_type_error: "El título seo debe ser un string",
        })
        .trim()
        .min(8, "El título seo debe ser por lo menos de 8 caracteres")
        .max(70, "El título seo debe ser máximo 70 caracteres"),
      seoDescription: z
        .string({
          required_error: "La descripción seo es obligatorio",
          invalid_type_error: "La descripción seo debe ser un string",
        })
        .trim()
        .min(8, "La descripción seo debe ser por lo menos de 8 caracteres")
        .max(160, "La descripción seo debe ser máximo 160 caracteres"),
    }),
  ),
});

export default formSchema;
