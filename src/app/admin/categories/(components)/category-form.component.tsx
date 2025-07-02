'use client';

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Save, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formSchema } from "../new/create-article.schema";
import { Category } from "@/interfaces/category.interface";
import { toast } from "sonner";
import { createCategoryAction } from "@/app/admin/(actions)/categories/create-category.action";

type Props = Readonly<{
  category?: Category;
}>;

export const CategoryForm: FC<Props> = ({ category }) => {
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // if (category && category.id) {
    //   const response = await editCategoryAction(
    //     formData,
    //     category.id as string,
    //   );

    //   if (!response.ok) {
    //     toast.error(response.message);
    //     return;
    //   }

    //   if (response.ok) {
    //     toast.success(response.message);
    //     form.reset();
    //     route.replace("/admin/categories");
    //     return;
    //   }
    // }

    if (!category) {
      const response = await createCategoryAction(formData);

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      if (response.ok) {
        toast.success(response.message);
        form.reset();
        route.replace("/admin/categories");
        return;
      }
    }
  };

  return (
    <div className="w-full lg:max-w-[768px] mx-auto">
      <h1 className="text-3xl md:text-5xl font-semibold text-center">
        { category ? 'Editar' : 'Crear' } Categoría
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="my-8 text-2xl font-semibold">DETALLES</h2>

          <section className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <div className="my-5 h-0.5"></div>

          <section className="flex flex-col gap-3 md:flex-row md:justify-end">
            <Button
              className="bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-muted-foreground cursor-pointer"
              type="button"
            >
              <Link href="/admin/articles" className="inline-flex items-center gap-2">
                Cancelar <XCircle />
              </Link>
            </Button>
            <Button
              type="submit"
              className={cn("cursor-pointer", {
                "bg-primary/60 dark:bg-secondary dark:hover:bg-secondary cursor-not-allowed": form.formState.isSubmitting,
              })}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2 text-secondary-foreground animate-pulse">
                  <span className="text-sm italic">Espere</span>
                  <LoaderCircle className="size-4 animate-spin" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Guardar <Save />
                </div>
              )}
            </Button>
          </section>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;