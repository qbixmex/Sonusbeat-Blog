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

const ArticlesPage = async () => {
  const response = await fetchArticlesAction();

  let articles: Article[] = [];

  if (!response.ok && !response.articles) {
    articles = [];
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
              <Articles articles={articles} />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default ArticlesPage;
