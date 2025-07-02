import AdminLayout from "@/app/admin/admin.layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import styles from "../styles.module.css";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryForm } from "../(components)/category-form.component";

const CreateArticlePage = () => {
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
                <BreadcrumbLink href="/admin/articles">Categorías</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Crear Categoría</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              <Card className="flex-1">
                <CardContent className="w-full max-w-[2024px] min-h-[512px] mx-auto">
                  <CategoryForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default CreateArticlePage;
