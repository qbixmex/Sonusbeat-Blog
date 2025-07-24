import { type FC } from 'react';
import Article from './article.component';
import { type PublicArticleForHomePage } from '@/interfaces/article.interface';

type Props = Readonly<{
  articles: PublicArticleForHomePage[];
}>;

export const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
