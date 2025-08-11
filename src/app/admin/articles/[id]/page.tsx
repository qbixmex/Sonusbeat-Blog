import { FC } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { redirect } from "next/navigation";
import AdminLayout from "@/app/admin/admin.layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import styles from "./styles.module.css";
import fetchArticleAction from "../(actions)/fetch-article.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn, renderRobots } from "@/root/src/lib/utils";
import "./styles.module.css";
import { Category } from "@/root/src/interfaces/category.interface";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tokyo-night-dark.min.css";
import rehypeRaw from "rehype-raw";
import rehypeYoutube from '@/lib/rehype-youtube';
import Divider from "@/root/src/components/divider.component";

type Author = { id: string; name: string };

type Props = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

const ArticlePage: FC<Props> = async ({ params }) => {

  const articleId = (await params).id;
  const response = await fetchArticleAction(articleId);

  if (!response.ok) {
    redirect("/admin/articles");
  }

  const article = response.article;

  return (
    <AdminLayout>
      <article>
        <header>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">Panel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/articles">Artículos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Artículo Detalles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              <h1 className="text-5xl font-semibold">Detalles del Artículo</h1>

              <Accordion type="single" collapsible defaultValue={"es"}>
                {article?.translations
                  .sort((a, b) => a.language === "es" ? -1 : b.language === "es" ? 1 : 0)
                  .map((translation) => (
                    <AccordionItem key={translation.id} value={translation.language}>
                      <AccordionTrigger>{translation.language === "en" ? "English" : "Español"}</AccordionTrigger>
                      <AccordionContent>
                        <Card className="flex-1">
                          <CardHeader>
                            <figure className="mb-5">
                              <Image
                                src={
                                  article?.imageURL?.startsWith("https")
                                    ? article.imageURL
                                    : `/images/blog/${article?.imageURL}`
                                }
                                width={1280}
                                height={720}
                                alt="Imagen de artículo"
                                className="w-full min-w-[300px] max-w-[1280px] object-cover rounded-lg mb-5"
                              />
                              <figcaption><b>Texto Alternativo:</b> {translation.imageAlt}</figcaption>
                            </figure>

                            <CardTitle>
                              <h2 className="text-3xl">{translation.title}</h2>
                            </CardTitle>

                            <Divider spaceY="sm" />

                            <section className="flex flex-col gap-5">
                              <h3 className="text-2xl font-semibold">Descripción</h3>
                              <p>{translation.description}</p>
                            </section>

                            <Divider spaceY="sm" />

                            <section className="flex flex-col gap-5 md:flex-row">
                              <div className="w-1/2">
                                <Table className="w-full">
                                  <TableBody>
                                    <TableRow>
                                      <TableHead className="font-bold w-[225px]">Categoría:</TableHead>
                                      <TableCell>
                                        <Link
                                          href={`/admin/categories/${(article?.category as Category).id}`}
                                          className="text-sky-600 hover:underline"
                                        >
                                          {(article?.category as Category).translations.find(
                                            (t) => t.language === translation.language
                                          )?.name ?? "No category available"}
                                        </Link>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead className="font-bold">Autor:</TableHead>
                                      <TableCell>
                                        <Link
                                          href={`/admin/profile/${(article?.author as Author).id}`}
                                          className="text-sky-600 hover:underline"
                                        >
                                          {(article?.author as Author).name}
                                        </Link>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead className="font-bold">Fecha de Creación:</TableHead>
                                      <TableCell>
                                        {format(new Date(article?.createdAt as Date), "d 'de' MMMM 'del' yyyy", { locale: es })}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead className="font-bold">Fecha de Actualización:</TableHead>
                                      <TableCell>
                                        {format(new Date(article?.updatedAt as Date), "d 'de' MMMM 'del' yyyy", { locale: es })}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead className="font-bold">Fecha de Publicación:</TableHead>
                                      <TableCell>
                                        {format(new Date(article?.publishedAt as Date), "d 'de' MMMM 'del' yyyy", { locale: es })}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                              <div className="w-1/2">
                                <Table className="w-full">
                                  <TableBody>
                                    <TableRow>
                                      <TableHead className="font-bold">Título Seo:</TableHead>
                                      <TableCell className="whitespace-break-spaces">{translation.seoTitle}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead className="font-bold">Descripción Seo:</TableHead>
                                      <TableCell className="whitespace-break-spaces">{translation.seoDescription}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead className="font-bold">Robots Seo:</TableHead>
                                      <TableCell>{renderRobots(article.seoRobots)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableHead>Estado:</TableHead>
                                      <TableCell>{article.published ? "Publicado" : "Borrador"}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </section>
                          </CardHeader>

                          <CardContent>
                            <Divider spaceY="sm" />

                            <h3 className="text-2xl font-semibold mb-5">Contenido</h3>

                            <section
                              className={cn([
                                "prose",
                                "prose-lg",
                                "dark:prose-invert",
                                "max-w-none",
                                styles.articleContent,
                              ])}
                            >
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeYoutube]}
                              >
                                {translation.content ?? "No content available."}
                              </ReactMarkdown>
                            </section>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default ArticlePage;
