import fetchPublicArticlesAction from "./(public)/(actions)/fetchArticlesAction";
import PublicLayout from "./(public)/public.layout";
import ArticlesList from "./(public)/components/article-list.component";
import { MainContainer } from "@/components/main-container.component";
import { PublicArticlesList } from "../interfaces/article.interface";

const HomePage = async () => {
  const response = await fetchPublicArticlesAction();

  let articles: PublicArticlesList[] = [];

  if (!response.ok && !response.articles) {
    articles = [];
  } else {
    articles = response.articles as PublicArticlesList[];
  }

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
