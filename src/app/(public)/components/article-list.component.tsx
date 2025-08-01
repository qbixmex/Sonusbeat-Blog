import { type FC } from 'react';
import Article from './article.component';
import { type PublicArticleForHomePage } from '@/interfaces/article.interface';

type Props = Readonly<{
  articles: PublicArticleForHomePage[];
  locale: string;
}>;

export const ArticlesList: FC<Props> = async ({ articles, locale }) => {
  const filteredArticles = articles.filter(article => {
    const hasArticleTranslation = article.translations.some(t => t.language === locale);
    const hasCategoryTranslation = article.category.translations?.some(t => t.language === locale);
    return hasArticleTranslation && hasCategoryTranslation;
  });

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
      {filteredArticles.map((article) => (
        <Article
          key={article.id}
          article={article}
          locale={locale}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
