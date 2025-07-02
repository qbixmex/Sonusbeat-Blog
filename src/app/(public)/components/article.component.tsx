import { FC } from 'react';
import { PublicArticlesList } from '@/interfaces/article.interface';
import Link from 'next/link';
import Image from 'next/image';

type Props = Readonly<{
  article: PublicArticlesList;
}>;

export const Article: FC<Props> = ({ article }) => {
  return (
    <article className="mb-5">
      <header>
        <figure className="relative mb-3 flex justify-center">
          <Image
            src={`/images/blog/${article.image}`}
            alt={`${article.title} imagen`}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded"
          />
          <figcaption className="bg-black/80 inline-block text-neutral-50 rounded-bl rounded-tr absolute left-0 bottom-0 px-2 py-1">
            { article.category.name }
          </figcaption>
        </figure>
        <h2 className="text-xl font-semibold mb-2 text-blue-500">
          { article.title }
        </h2>
      </header>
      <main>
        <div className="mb-5 text-muted-foreground">
          { article.description }
        </div>
      </main>
      <footer>
        <div className="text-right">
          <Link
            href={`/${article.category.slug}/${article.slug}`}
            className="bg-blue-800 px-4 py-2 rounded lowercase"
          >
            Ver más
          </Link>
        </div>
      </footer>
    </article>
  );

};

export default Article;
