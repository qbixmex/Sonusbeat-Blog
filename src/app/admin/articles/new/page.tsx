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
import ArticleForm from "../(components)/article-form.component";
import { fetchCategoriesAction } from "@/app/admin/categories/(actions)/fetch-categories.action";
import { Category } from "@/interfaces/category.interface";

const CreateArticlePage = async () => {
  const response = await fetchCategoriesAction();

  if (!response.ok) {
    console.error("Error fetching articles:", response.message);    
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
                <BreadcrumbLink href="/admin/articles">Artículos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Crear Artículo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              <Card className="flex-1">
                <CardContent>
                  <ArticleForm categories={categories} />
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
