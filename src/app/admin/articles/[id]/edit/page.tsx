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
import { fetchArticleAction } from "@/app/admin/articles/(actions)/fetch-article.action";
import { fetchCategoriesAction } from "@/app/admin/categories/(actions)/fetch-categories.action";
import { ArticleForm } from "@/app/admin/articles/(components)/article-form.component";
import { Article } from "@/interfaces/article.interface";
import { Category } from "@/interfaces/category.interface";

type Props = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

const EditArticlePage: FC<Props> = async ({ params }) => {
  const articleId = (await params).id;
  const responseArticle = await fetchArticleAction(articleId);

  if (!responseArticle.ok) {
    redirect("/admin/articles");
  }

  const article = responseArticle.article as Article;
  const responseCategories = await fetchCategoriesAction();

  if (!responseCategories.message) {
    console.error("Error fetching categories:", responseCategories.message);    
  }

  const categories = responseCategories.categories as Category[];

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
                <BreadcrumbPage>Editar Artículo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.section}>
              <ArticleForm
                article={article}
                categories={categories}
              />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default EditArticlePage;
