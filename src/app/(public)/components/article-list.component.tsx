import { FC } from 'react';
import { PublicArticlesList } from '@/interfaces/article.interface';
import Article from './article.component';

type Props = Readonly<{
  articles: PublicArticlesList[];
}>;

export const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <>
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
      >
        {(articles.length > 0) && articles.map((data) => (
          <Article key={data.id} article={data} />
        ))}
      </section>
    </>
  );
};

export default ArticlesList;
