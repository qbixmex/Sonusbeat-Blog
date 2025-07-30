import { FC } from "react";
import fetchPublicArticlesAction from "@/app/(public)/(actions)/fetch-articles.action";
import PublicLayout from "@/app/(public)/public.layout";
import ArticlesList from "@/app/(public)/components/article-list.component";
import { MainContainer } from "@/components/main-container.component";

export const dynamic = 'force-dynamic';

type Props = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const HomePage: FC<Props> = async ({ params }) => {
  const { locale } = await params;

  const response = await fetchPublicArticlesAction();
  const articles = response.articles ?? [];

  return (
    <PublicLayout>
      <MainContainer>
        <h1 className="hide-element">Sonusbeat Blog</h1>
        <ArticlesList articles={articles} locale={locale} />
      </MainContainer>
    </PublicLayout>
  );
};

export default HomePage;
