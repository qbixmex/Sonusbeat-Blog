import type { FC } from "react";
import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { fetchPublicArticlesAction, ResponseFetchArticles } from "@/app/(public)/(actions)/fetch-articles.action";
import PublicLayout from "@/app/(public)/public.layout";
import ArticlesList from "@/app/(public)/components/article-list.component";
import { MainContainer } from "@/components/main-container.component";
import type { Pagination } from "@/interfaces/pagination.interface";
import { PublicPagination } from "@/app/(public)/components/pagination/pagination.component";
import { unstable_cache } from 'next/cache';

type Props = Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    take?: string;
  }>;
}>;

const HomePage: FC<Props> = ({ params, searchParams }) => {
  const { page, take } = use(searchParams);
  const { locale } = use(params);
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const getCachedArticles = unstable_cache(
    async () => {
      return fetchPublicArticlesAction({
        page: page ? parseInt(page) : undefined,
        take: take ? parseInt(take) : undefined,
      });
    },
    ["public-articles", page, take],
    {
      tags: ['public-articles'],
      revalidate: 86000, // Every 24 hours (24 * 60 * 60)
    }
  );

  const { articles, pagination } = use(getCachedArticles()) as ResponseFetchArticles;
  const { totalPages } = pagination as Pagination;

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const translate = useTranslations('HomePage');

  return (
    <PublicLayout>
      <MainContainer>
        <h1 className="hide-element">{translate('title')}</h1>
        <ArticlesList articles={articles ?? []} locale={locale} />
        { totalPages > 1 && <PublicPagination totalPages={totalPages} />}
      </MainContainer>
    </PublicLayout>
  );
};

export default HomePage;
