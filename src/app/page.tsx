import fetchPublicArticlesAction from "./(public)/(actions)/fetch-articles.action";
import PublicLayout from "./(public)/public.layout";
import ArticlesList from "./(public)/components/article-list.component";
import { MainContainer } from "@/components/main-container.component";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const response = await fetchPublicArticlesAction();
  const articles = response.articles ?? [];

  return (
    <PublicLayout>
      <MainContainer>
        <h1 className="hide-element">Sonusbeat Blog</h1>
        <ArticlesList articles={articles} />
      </MainContainer>
    </PublicLayout>
  );
};

export default HomePage;
