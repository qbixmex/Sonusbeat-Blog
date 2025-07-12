'use client';

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, LoaderCircle, Save, XCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { cn, createSlug } from "@/lib/utils";
import imagePlaceholder from "@/assets/svg/landscape-placeholder.svg";
import { toast } from "sonner";
import { createArticleAction } from "../(actions)/create-article.action";
import { updateArticleAction } from "../(actions)/update-article.action";
import { useSession } from "next-auth/react";
import { formSchema } from "../new/create-article.schema";
import { Article } from "@/interfaces/article.interface";
import { Category } from "@/interfaces/category.interface";

type Props = Readonly<{
  categories: Category[];
  article?: Article;
}>;

export const ArticleForm: FC<Props> = ({ article, categories }) => {
  const route = useRouter();
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title ?? "",
      slug: article?.slug ?? "",
      description: article?.description ?? "",
      content: article?.content ?? "",
      categoryId: (article?.category as Category).id ?? "",
      image: article?.image ?? "",
      imageAlt: article?.imageAlt ?? "",
      seoTitle: article?.seoTitle ?? "",
      seoDescription: article?.seoDescription ?? "",
      seoRobots: article?.seoRobots ?? "noindex_nofollow",
      publishedAt: article?.publishedAt ?? new Date(),
      published: article?.published ?? false,
    },
  });

  // Watch the title field
  const titleValue = form.watch("title");

  // Whenever title changes, set slug to the same value
  useEffect(() => {
    form.setValue("slug", createSlug(titleValue));
  }, [titleValue, form]);

  const [openCalendar, setOpenCalendar] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, value);
      }
    });

    if (article && article.id) {
      const response = await updateArticleAction(
        formData,
        article.id as string,
      );

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      if (response.ok) {
        toast.success(response.message);
        form.reset();
        route.replace("/admin/articles");
        return;
      }
    }

    if (!article) {
      const response = await createArticleAction(
        formData,
        session.data?.user.id ?? ""
      );

      if (!response.ok) {
        toast.error(response.message);
        return;
      }

      if (response.ok) {
        toast.success(response.message);
        form.reset();
        route.replace("/admin/articles");
        return;
      }
    }
  };

  return (
    <div className="w-full lg:max-w-[768px] mx-auto">
      <h1 className="text-3xl md:text-5xl font-semibold text-center">
        {article ? 'Editar' : 'Crear'} Articulo
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="my-8 text-2xl font-semibold">DETALLES</h2>

          <section className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <p>Fecha de Publicación</p>
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <FormField
                    control={form.control}
                    name="publishedAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            className="rounded-lg border"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </PopoverContent>
              </Popover>
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        {field.value ? "Publicado" : "No Publicado"}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormControl>
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id as string}
                            >{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none min-h-20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none min-h-40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <div className="my-10 h-0.5 bg-gray-700"></div>

          <h2 className="my-8 text-2xl font-semibold">IMAGEN</h2>

          <section className="flex flex-col md:flex-row gap-5">
            <figure className="w-full md:w-1/2">
              <Image
                src={imagePlaceholder}
                alt="Placeholder de artículo"
                className="w-full h-auto md:max-w-[300px] rounded"
                width={200}
                height={200}
              />
            </figure>
            <div className="w-full flex flex-col gap-5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageAlt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto Alternativo de Imagen</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <div className="my-10 h-0.5 bg-gray-700"></div>

          <h2 className="my-8 text-2xl font-semibold">SEO</h2>

          <section className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="seoTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título Seo</FormLabel>
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
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="seoDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción SEO</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none min-h-20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seoRobots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Robots SEO</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="index_follow">Indexar y Seguir</SelectItem>
                          <SelectItem value="noindex_follow">No Indexar y Seguir</SelectItem>
                          <SelectItem value="index_nofollow">Indexar y No Seguir</SelectItem>
                          <SelectItem value="noindex_nofollow">No Indexar y No Seguir</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <div className="my-10 h-0.5 bg-gray-700"></div>

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

export default ArticleForm;