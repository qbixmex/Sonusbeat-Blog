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
import { Articles } from "./(components)/articles.component";
import fetchArticlesAction, { Pagination } from "./(actions)/fetch-articles.action";
import { PaginationLinks } from "../(components)/pagination/pagination.component";

type Props = Readonly<{
  searchParams: Promise<{
    page?: string;
    take?: string;
  }>;
}>;

const ArticlesPage: FC<Props> = async ({ searchParams }) => {
  const { page, take } = await searchParams;

  const paginationOptions = {
    page: parseInt(page ?? '1'),
    take: parseInt(take ?? '12'),
  };

  const response = await fetchArticlesAction(paginationOptions);
  const articles = response.articles ?? [];

  if (articles.length === 0) {
    redirect('/admin/articles?page=1');
  }

  const { totalPages, currentPage } = response.pagination as Pagination;

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
              <Articles
                articles={articles}
                pagination={{ totalPages, currentPage }}
              />
              <PaginationLinks totalPages={totalPages} />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default ArticlesPage;
