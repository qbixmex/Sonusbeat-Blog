import Link from "next/link";
import AdminLayout from "@/app/admin/admin.layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Categories from "./(components)/categories.component";
import { fetchCategoriesAction } from "./(actions)/fetch-categories.action";
import { Category } from "@/interfaces/category.interface";
import styles from "./styles.module.css";

const CategoriesPage = async () => {
  const response = await fetchCategoriesAction();

  if (!response.ok) {
    toast.error(response.message);
  }

  const categories = response.categories as Category[];

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
                <BreadcrumbPage>Categorías</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              {
                (categories && categories.length === 0) ? (
                  <div className="flex-1 flex flex-col justify-center bg-stone-700 text-stone-100 rounded px-2 py-4">
                    <p className="text-center italic font-semibold mb-3">No hay categories para mostrar en este momento</p>
                    <div className="text-center">
                      <Button
                        className="text-blue-100 cursor-pointer"
                      >
                        <Link href="/admin/categories/new" title="Crear nueva categoría">
                          Crear Categoría
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Categories categories={categories} />
                )
              }
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default CategoriesPage;
