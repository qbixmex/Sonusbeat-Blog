import { FC } from "react";
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
import fetchArticleAction from "@/app/admin/(actions)/fetch-article.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import placeholderImage from "@/assets/svg/landscape-placeholder.svg";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { renderRobots } from "@/root/src/lib/utils";

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
                  <CardTitle>Detalles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-5">
                    <figure className="w-full md:w-1/2 lg:w-1/3 xl:1/4">
                      <Image
                        src={placeholderImage}
                        width={400}
                        height={400}
                        alt="Imagen de artículo"
                        className="w-full h-auto md:max-w-[400px] object-cover rounded"
                      />
                      <figcaption className="text-sm text-center text-muted-foreground italic mt-2">
                        { article?.imageAlt || "Imagen de artículo" }
                      </figcaption>
                    </figure>
                    <section className="w-full md:w-1/2 lg:w-2/3 xl:3/4">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Título:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.title }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Descripción:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.description }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Autor:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.author }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Categoría:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.category }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Contenido:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.content.slice(0, 30) } ...
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Título Seo:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.seoTitle }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Descripción Seo:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.seoDescription }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Robots Seo:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { renderRobots(article?.seoRobots as string) }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Estado:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { article?.published ? "Publicado" : "No Publicado" }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Publicado en:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { format(new Date(article?.publishedAt as Date), 'EEEE MMMM d, yyyy') }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </section>
                  </div>
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
