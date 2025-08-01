import { FC } from "react";
import Link from "next/link";
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
import { renderRobots } from "@/root/src/lib/utils";
import "./styles.module.css";
import { Category } from "@/root/src/interfaces/category.interface";

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
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-3xl">Información del Artículo</CardTitle>
                </CardHeader>
                <CardContent>
                  <section className="flex flex-col gap-y-5 md:flex-row md:gap-x-10 justify-start items-center mb-5">
                    <div className="w-full md:max-w-[600px]">
                      <Image
                        src={
                          article?.imageURL?.startsWith("https")
                            ? article.imageURL
                            : `/images/blog/${article?.imageURL}`
                        }
                        width={600}
                        height={400}
                        alt="Imagen de artículo"
                        className="w-full min-w-[300px] max-w-[600px] object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <Table className="w-full">
                        <TableBody>
                          <TableRow>
                            <TableHead>URL de la Imagen:</TableHead>
                            <TableCell className="text-muted-foreground break-all whitespace-normal">
                              {article?.imageURL}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Texto Alternativo:</TableHead>
                            <TableCell className="text-muted-foreground">
                              {article?.imageAlt}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  <Table className="w-full">
                    <TableBody>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Título:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground break-words">
                          {article?.title}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Slug:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground break-words">
                          {article?.slug}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold align-top">Descripción:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground whitespace-break-spaces break-words">
                          {article?.description}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Autor:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          <Link
                            href={`/admin/profile/${(article?.author as { id: string }).id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {(article?.author as { name: string }).name}
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Categoría:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          <Link
                            href={
                              (article && (article.category as Category).translations.length > 0)
                                ? `/admin/categories/${(article?.category as Category).translations[0].name}`
                                : "#"
                            }
                            className="text-blue-500 hover:underline"
                          >
                            {(article?.category as Category).translations[0].name ?? "Sin Categoría"}
                          </Link>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold align-top">Contenido:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground whitespace-break-spaces break-words">
                          {article?.content}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Título Seo:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          {article?.seoTitle}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold align-top">Descripción Seo:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground whitespace-break-spaces break-words">
                          {article?.seoDescription}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Robots Seo:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          {renderRobots(article?.seoRobots as string)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Estado:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          {article?.published ? "Publicado" : "No Publicado"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Publicado en:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          {format(new Date(article?.publishedAt as Date), "d 'de' MMMM 'del' yyyy", { locale: es })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Fecha de creación:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          {format(new Date(article?.createdAt as Date), "d 'de' MMMM 'del' yyyy", { locale: es })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className="text-sm font-semibold">Fecha de actualización:</TableHead>
                        <TableCell className="text-pretty text-muted-foreground">
                          {format(new Date(article?.updatedAt as Date), "d 'de' MMMM 'del' yyyy", { locale: es })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default ArticlePage;
