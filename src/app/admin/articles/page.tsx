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
import fetchArticlesAction, { ResponseFetchArticles } from "./(actions)/fetch-articles.action";
import { PaginationLinks } from "../(components)/pagination/pagination.component";
import { Pagination } from "@/interfaces/pagination.interface";
import { unstable_cache } from "next/cache";

type Props = Readonly<{
  searchParams: Promise<{
    page?: string;
    take?: string;
  }>;
}>;

const ArticlesPage: FC<Props> = async ({ searchParams }) => {
  const { page = '1', take = '6' } = await searchParams;

  const paginationOptions = {
    page: parseInt(page ?? '1'),
    take: parseInt(take ?? '6'),
  };

  const getCachedArticles: () => Promise<ResponseFetchArticles> = unstable_cache(
    async () => {
      return fetchArticlesAction(paginationOptions);
    },
    ["admin-articles", page, take],
    {
      tags: ['admin-articles'],
      revalidate: 86000, // Every 24 hours (24 * 60 * 60)
    }
  );

  const { articles = [], pagination } = await getCachedArticles();

  if (articles?.length === 0) {
    redirect('/admin/articles?page=1');
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
              <Articles articles={articles!} />
              <PaginationLinks totalPages={(pagination as Pagination).totalPages} />
            </div>
          </div>
        </main>
      </article>
    </AdminLayout>
  );
};

export default ArticlesPage;
