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
import { Articles } from "./(components)/articles.component";
import { Article } from "@/interfaces/article.interface";
import fetchArticlesAction from "./(actions)/fetch-articles.action";
import { toast } from "sonner";

const ArticlesPage = async () => {
  const response = await fetchArticlesAction();

  if (!response.ok) {
    toast.error(response.message);
  }

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
                <BreadcrumbPage>Artículos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              <Articles articles={response.articles as Article[]} />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default ArticlesPage;
