'use client';

import { useState } from "react";
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
import { Textarea } from "@/root/src/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, LoaderCircle, Send } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { formSchema } from "../create-article.schema";
import imagePlaceholder from "@/assets/svg/landscape-placeholder.svg";
import Link from "next/link";
import { createArticleAction } from "@/app/admin/(actions)/create-article.action";
import { useSession } from "next-auth/react";

export const ArticleForm = () => {
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      image: "",
      imageAlt: "",
      seoTitle: "",
      seoDescription: "",
      seoRobots: "noindex_nofollow",
      publishedAt: new Date(),
      published: false,
    },
  });

  const [ openCalendar, setOpenCalendar ] = useState(false);

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

    const response = await createArticleAction(formData, session.data?.user.id ?? "");

    console.log("Respuesta:", response);

    // if (response === 'Success') {
    //   form.reset();
    // }
  };

  return (
    <div className="w-full lg:max-w-[768px] mx-auto">
      <h1 className="text-3xl md:text-5xl font-semibold text-center">Crear Articulo</h1>
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
            <div className="w-full md:w-1/2">
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
            </div>
          </section>
          
          <div className="my-10 h-0.5 bg-gray-700"></div>

          <section className="flex flex-col gap-3 md:flex-row md:justify-end">
            <Button className="bg-gray-700 hover:bg-gray-800 text-muted-foreground cursor-pointer">
              <Link href="/admin/articles">Cancelar</Link>
            </Button>
            <Button
              type="submit"
              className={cn("cursor-pointer", {
                "bg-secondary hover:bg-secondary cursor-not-allowed": form.formState.isSubmitting,
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
                  <span>Crear</span> <Send />
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