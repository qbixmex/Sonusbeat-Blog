import { type FC, use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import fetchPublicArticlesAction from "@/app/(public)/(actions)/fetch-articles.action";
import PublicLayout from "@/app/(public)/public.layout";
import ArticlesList from "@/app/(public)/components/article-list.component";
import { MainContainer } from "@/components/main-container.component";

export const dynamic = 'force-dynamic';

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const HomePage: FC<Props> = ({ params }) => {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const response = use(fetchPublicArticlesAction({ limit: 7 }));
  const articles = response.articles ?? [];

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const translate = useTranslations('HomePage');

  return (
    <PublicLayout>
      <MainContainer>
        <h1 className="hide-element">{translate('title')}</h1>
        <ArticlesList articles={articles} locale={locale} />
      </MainContainer>
    </PublicLayout>
  );
};

export default HomePage;
