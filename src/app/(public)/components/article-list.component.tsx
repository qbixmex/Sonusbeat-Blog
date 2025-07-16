import { FC, Fragment } from 'react';
import { PublicArticlesList } from '@/interfaces/article.interface';
import Article from './article.component';

type Props = Readonly<{
  articles: PublicArticlesList[];
}>;

export const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <>
      <section>
        {(articles.length > 0) && articles.map((data, index, array) => (
          <Fragment key={data.id}>
            <Article article={data} />
            {
              index < array.length - 1 && (
                <div className="bg-stone-400 dark:bg-stone-700 h-[1px] mb-5"></div>
              )
            }
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default ArticlesList;
