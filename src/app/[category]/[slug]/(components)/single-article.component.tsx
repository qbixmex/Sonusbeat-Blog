'use client';

import { FC } from 'react';
import Image from 'next/image';
import { PublicArticle } from '@/interfaces/article.interface';
import Link from 'next/link';
import { format } from 'date-fns/format';
import ReactMarkdown from "react-markdown";

type Props = Readonly<{
  article: PublicArticle;
}>;

export const SingleArticle: FC<Props> = ({ article }) => {
  return (
    <article>
      <header className="flex flex-col gap-2 mb-5">
        <h1 className="order-2 text-3xl font-semibold">{ article.title }</h1>
        <Image
          src={`/images/blog/${article.image}`}
          alt={article.imageAlt}
          width={1200}
          height={600}
          className="order-1 w-full h-[400px] object-cover my-4 rounded"
        />
      </header>

      <section className='mb-10'>
        { article.description }
      </section>

      <main>
        <section className="mb-10">
          <div className="flex gap-2 text-muted-foreground">
            <span><b>Autor:</b></span>
            <Link href={`/author/${article.author.username}`}>
              {article.author.name}
            </Link>
          </div>
          <div className="flex gap-2 text-muted-foreground">
            <span><b>Categoría:</b></span>
            <Link href={`/${article.category.slug}/articles`}>
              {article.category.name}
            </Link>
          </div>
          <div className="flex gap-2 text-muted-foreground">
            <span><b>Fecha de Publicación:</b></span>
            {
              article.publishedAt
                ? format(new Date(article.publishedAt), 'MMMM dd, yyyy')
                : 'Fecha desconocida'
            }
          </div>
        </section>
      </main>
        <section className="mb-5 prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </section>
    </article>
  );

};

export default SingleArticle;
