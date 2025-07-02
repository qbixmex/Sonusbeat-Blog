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
import { fetchCategoryAction } from "@/app/admin/categories/(actions)/fetch-category.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

type Props = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

const Page: FC<Props> = async ({ params }) => {

  const categoryId = (await params).id;
  const response = await fetchCategoryAction(categoryId);

  if (!response.ok) {
    redirect("/admin/categories");
  }

  const category = response.category;

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
                <BreadcrumbLink href="/admin/categories">Categorías</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalles de Categoría</BreadcrumbPage>
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
                    <section className="w-full md:w-1/2 lg:w-2/3 xl:3/4">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Nombre:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { category?.name }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Slug:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { category?.slug }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Fecha de Creación:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { format(new Date(category?.createdAt as Date), "PPpp") }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Fecha de Actualización:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              { format(new Date(category?.updatedAt as Date), "PPpp") }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead className="text-sm font-semibold">Artículos:</TableHead>
                            <TableCell className="text-pretty text-muted-foreground">
                              (22) {'<-- Por Hacer'}
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

export default Page;
