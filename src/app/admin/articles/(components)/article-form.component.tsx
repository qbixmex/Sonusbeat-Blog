'use client';

import { FC, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, LoaderCircle, Save, XCircle, ImageIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createArticleAction } from "../(actions)/create-article.action";
import { updateArticleAction } from "../(actions)/update-article.action";
import { useSession } from "next-auth/react";
import createArticleSchema from "../new/create-article.schema";
import editArticleSchema from "../[id]/edit/edit-article.schema";
import { Article } from "@/interfaces/article.interface";
import { Category } from "@/interfaces/category.interface";
import MdEditorField from "./md-editor-field.component";
// import { CharactersCounter } from "@/components/characters-counter.component";
import Divider from "@/components/divider.component";
import deleteContentImageAction from "../(actions)/delete-content-image";

type Props = Readonly<{
  categories: Category[];
  article?: Article;
}>;

// type CountCharacters = {
//   count: number;
//   focused: boolean;
// };

export const ArticleForm: FC<Props> = ({ article, categories }) => {
  const route = useRouter();
  const session = useSession();

  // const [articleDescriptionChars, setArticleDescriptionChars] = useState<CountCharacters>({
  //   count: article ? article.description.length : 0,
  //   focused: false,
  // });

  // const [seoDescriptionChars, setSeoDescriptionChars] = useState<CountCharacters>({
  //   count: article && article.seoDescription ? article.seoDescription?.length : 0,
  //   focused: false,
  // });

  const formSchema = !article ? createArticleSchema : editArticleSchema;
  const [isDeletingImage, setIsDeletingImage] = useState<string | null>(null);
  const [contentImages, setContentImages] = useState<string[]>(article?.images ?? []);

  const updateContentImage = (imageUrl: string) => {
    setContentImages((prevUrlImages) => [...prevUrlImages, imageUrl]);
  };

  useEffect(() => {
    setContentImages(article?.images ?? []);
  }, [article?.images]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: article?.category ? (article?.category as Category).id : undefined,
      seoRobots: article?.seoRobots ?? "noindex_nofollow",
      publishedAt: article?.publishedAt ?? new Date(),
      published: article?.published ?? false,
      translations: (article && article.translations && article.translations.length > 0)
        ? [...article.translations]
          .sort((a, b) => {
            if (a.language === b.language) return 0;
            if (a.language === "es") return -1;
            if (b.language === "es") return 1;
            return 0;
          })
          .map((t) => ({
            language: t.language,
            title: t.title,
            slug: t.slug,
            description: t.description,
            content: t.content,
            imageAlt: t.imageAlt,
            seoTitle: t.seoTitle,
            seoDescription: t.seoDescription,
          }))
        : [
          { language: "es", title: "", slug: "", description: "", content: "", imageAlt: "", seoTitle: "", seoDescription: "" },
          { language: "en", title: "", slug: "", description: "", content: "", imageAlt: "", seoTitle: "", seoDescription: "" }
        ],
    },
  });

  const [openCalendar, setOpenCalendar] = useState(false);

  const handleDeleteImage = async (imageUrl: string) => {
    setIsDeletingImage(imageUrl);

    const response = await deleteContentImageAction(article?.id as string, imageUrl);

    if (response.ok) {
      setContentImages(prevImages => prevImages.filter(img => img !== imageUrl));
      setIsDeletingImage(null);
      toast.success("Imagen eliminada correctamente 👍");
    }

    if (!response.ok) {
      setIsDeletingImage(null);
      toast.error("¡ No se pudo eliminar la imagen !");
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("categoryId", data.categoryId);
    formData.append("seoRobots", data.seoRobots);
    formData.append("publishedAt",
      data.publishedAt
        ? data.publishedAt.toISOString()
        : new Date().toISOString()
    );
    formData.append("published", data.published ? "true" : "false");

    if (data.image && typeof data.image === "object") {
      formData.append("image", data.image);
    }

    formData.append("translations", JSON.stringify(data.translations));

    if (article && article.id) {
      const response = await updateArticleAction(
        formData,
        article.id as string,
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

  const { fields } = useFieldArray({
    control: form.control,
    name: "translations",
  });

  return (
    <div className="w-full lg:max-w-[768px] mx-auto">
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-10">
        {article ? 'Editar' : 'Crear'} Articulo
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex flex-col gap-5">
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <section>
                  <h2 className="text-3xl font-semibold mb-10">
                    {field.language === "es" ? "Español" : "English"}
                  </h2>
                  <input type="hidden" {...form.register(`translations.${index}.language`)} />
                  {/* Title and Slug */}
                  <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name={`translations.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {(fields[index].language === "es") && "Título"}
                              {(fields[index].language === "en") && "Title"}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name={`translations.${index}.slug`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {(fields[index].language === "es") && "Enlace Permanente"}
                              {(fields[index].language === "en") && "Slug"}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* Description */}
                  <section>
                    <FormField
                      control={form.control}
                      name={`translations.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {(fields[index].language === "es") && "Descripción"}
                            {(fields[index].language === "en") && "Description"}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="resize-none min-h-20"
                              // onFocus={() => setArticleDescriptionChars((prev) => ({
                              //   ...prev,
                              //   focused: true
                              // }))}
                              // onBlur={() => setArticleDescriptionChars((prev) => ({
                              //   ...prev,
                              //   focused: false
                              // }))}
                              onChange={(event) => {
                                field.onChange(event);
                                // setArticleDescriptionChars((prev) => ({
                                //   ...prev,
                                //   count: event.target.value.length
                                // }));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* {articleDescriptionChars.focused && (
                      <CharactersCounter
                        charactersCount={articleDescriptionChars.count}
                        limit={250}
                      />
                    )} */}
                  </section>
                  <Divider spaceY="lg" />
                  {/* Content */}
                  <section>
                    <FormField
                      control={form.control}
                      name={`translations.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {(fields[index].language === "es") && "Contenido"}
                            {(fields[index].language === "en") && "Content"}
                          </FormLabel>
                          <FormControl>
                            <MdEditorField
                              value={field.value}
                              setContent={value => field.onChange(value)}
                              articleId={article?.id ?? undefined}
                              updateContentImage={updateContentImage}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                  <Divider spaceY="lg" />
                  {/* SEO */}
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 flex flex-col gap-5">
                      <FormField
                        control={form.control}
                        name={`translations.${index}.seoTitle`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {(fields[index].language === "es") && "Título Seo"}
                              {(fields[index].language === "en") && "Seo Title"}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`translations.${index}.imageAlt`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {(fields[index].language === "es") && "Texto alternativo de la Imagen"}
                              {(fields[index].language === "en") && "Image alternative text"}
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name={`translations.${index}.seoDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {(fields[index].language === "es") && "Descripción Seo"}
                              {(fields[index].language === "en") && "Seo Description"}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="resize-none min-h-20"
                                // onFocus={() => setSeoDescriptionChars((prev) => ({
                                //   ...prev,
                                //   focused: true
                                // }))}
                                // onBlur={() => setSeoDescriptionChars((prev) => ({
                                //   ...prev,
                                //   focused: false
                                // }))}
                                onChange={(event) => {
                                  field.onChange(event);
                                  // setSeoDescriptionChars((prev => ({
                                  //   ...prev,
                                  //   count: event.target.value.length
                                  // })));
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* {seoDescriptionChars.focused && (
                        <CharactersCounter
                          charactersCount={seoDescriptionChars.count}
                          limit={160}
                        />
                      )} */}
                    </div>
                  </div>
                </section>
                <Divider spaceY="lg" />
              </Fragment>
            ))}
          </section>

          <section>
            {
              (contentImages.length > 0) && (
                <>
                  <h2 className="text-3xl mt-8 font-semibold mb-5">
                    Imágenes del contenido
                  </h2>
                  <div className="flex flex-wrap gap-5">
                    {contentImages.map((image) => (
                      <figure key={image} className="relative w-fit">
                        <Image
                          src={image}
                          alt="Imagen del contenido"
                          width={150}
                          height={150}
                          className="w-[150px] h-[150px] object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          disabled={isDeletingImage === image}
                          className={cn("!bg-pink-600/70 hover:!bg-pink-600 absolute top-0 right-0 cursor-pointer", {
                            "cursor-not-allowed !bg-gray-500": isDeletingImage === image,
                          })}
                          onClick={() => handleDeleteImage(image)}
                        >
                          {isDeletingImage === image
                            ? <LoaderCircle className="animate-spin" />
                            : <X className="size-[25px]" />
                          }
                        </Button>
                      </figure>
                    ))}
                  </div>
                </>
              )}
          </section>

          <h2 className="my-8 text-2xl font-semibold uppercase">
            {!article ? "Cargar Imagen" : "Remplazar Imagen"}
          </h2>

          <section className="flex flex-col gap-5">
            <div className="w-full md:w-1/2">
              <figure>
                {
                  (article && article.imageURL) ? (
                    <Dialog>
                      <DialogTrigger className="cursor-pointer">
                        <Image
                          src={
                            article.imageURL.startsWith("http")
                              ? article.imageURL
                              : `/images/blog/${article.imageURL}`
                          }
                          alt={article.translations[0].imageAlt ?? "Imagen del artículo"}
                          width={300}
                          height={200}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </DialogTrigger>
                      <DialogContent style={{ maxWidth: "1280px" }}>
                        <DialogHeader>
                          <DialogTitle className="sr-only">
                            {article.translations[0].imageAlt ?? "Imagen del artículo"}
                          </DialogTitle>
                        </DialogHeader>
                        <Image
                          src={
                            article.imageURL.startsWith("http")
                              ? article.imageURL
                              : `/images/blog/${article.imageURL}`
                          }
                          alt={article.translations[0].imageAlt ?? "Imagen del artículo"}
                          width={1280}
                          height={720}
                          className="w-full max-w-[1280px] h-auto object-cover rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <ImageIcon
                      strokeWidth={0.5}
                      className="w-full h-full text-neutral-500 relative"
                    />
                  )
                }
              </figure>
            </div>
            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Divider spaceY="lg" />

          <section className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <div>
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
              </div>
              <div>
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
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={!!form.formState.errors.categoryId}
                        >
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id as string}
                            >
                              {category.translations[0].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
          </section>

          <Divider spaceY="lg" />

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