import { FC, Fragment } from 'react';
import { PublicArticlesList } from '@/interfaces/article.interface';
import Article from './article.component';

type Props = Readonly<{
  articles: PublicArticlesList[];
}>;

export const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3 lg:gap-8">
      {(articles.length > 0) && articles.map((data) => (
        <Fragment key={data.id}>
          <Article article={data} />
        </Fragment>
      ))}
    </div>
  );
};

export default ArticlesList;
