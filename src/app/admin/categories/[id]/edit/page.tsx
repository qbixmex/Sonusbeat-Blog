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
import { CategoryForm } from "../../(components)/category-form.component";
import { Category } from "@/interfaces/category.interface";

type Props = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

const EditCategoryPage: FC<Props> = async ({ params }) => {

  const categoryId = (await params).id;
  const response = await fetchCategoryAction(categoryId);

  if (!response.ok) {
    redirect("/admin/categories");
  }

  const category = response.category as Category;

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
                <BreadcrumbPage>Editar Categoría</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              <CategoryForm category={category} />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default EditCategoryPage;
