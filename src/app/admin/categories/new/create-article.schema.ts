import z from "zod";

export const formSchema = z.object({
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