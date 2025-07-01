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
import ArticleForm from "../../(components)/article-form.component";
import { Article } from "@/interfaces/article.interface";

type Props = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

const EditArticlePage: FC<Props> = async ({ params }) => {

  const articleId = (await params).id;
  const response = await fetchArticleAction(articleId);

  if (!response.ok) {
    redirect("/admin/articles");
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
              <ArticleForm article={response.article as Article} />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default EditArticlePage;
