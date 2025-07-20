'use client';

import { FC, useState } from 'react';
import { PublicArticlesList } from '@/interfaces/article.interface';
import Link from 'next/link';
import Image from 'next/image';
import { es } from 'date-fns/locale';
import { articleFormatDate } from '@/lib/utils';
import { CalendarDays, Eye, EyeClosed } from 'lucide-react';
import { Button } from '@/root/src/components/ui/button';

type Props = Readonly<{
  article: PublicArticlesList;
}>;

export const Article: FC<Props> = ({ article }) => {
  const [fullDescription, setFullDescription] = useState(false);

  return (
    <article className="bg-stone-200/50 dark:bg-stone-900 rounded-lg flex flex-col">
      <header>
        <Link href={`/${article.category.slug}/${article.slug}`}>
          <figure className="relative">
            <Image
              src={
                article.imageURL.startsWith("https")
                ? article.imageURL
                : `/images/blog/${article.imageURL}`
              }
              alt={`${article.imageAlt} imagen`}
              width={720}
              height={480}
              className="object-cover rounded-t-lg"
            />
            <span className="bg-black/80 inline-block text-neutral-50 rounded-tr absolute left-0 bottom-0 px-2 py-1">
              {article.category.name}
            </span>
          </figure>
        </Link>
      </header>
      <main className="flex-1 flex flex-col p-5">
        <h2 className="text-2xl md:text-2xl font-semibold text-stone-700 dark:text-stone-100">
          <Link href={`/${article.category.slug}/${article.slug}`}>
            {article.title}
          </Link>
        </h2>

        <div className="flex-1 text-lg text-stone-600 dark:text-stone-400 italic my-5">
          <span className="leading-8 mr-2">
            {
              fullDescription
                ? article.description
                : article.description.length < 90
                  ? article.description
                  : `${article.description.slice(0, 90)} ...`
            }
          </span>
          {
            article.description.length > 90 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFullDescription(!fullDescription)}
              >
                {fullDescription ? <Eye /> : <EyeClosed />}
              </Button>
            )
          }
        </div>

        <div className="flex justify-end lg:justify-start items-center gap-2">
          <CalendarDays className="text-pink-600" />
          <span className="text-muted-foreground">
            {
              article.publishedAt
                ? articleFormatDate(article.publishedAt, es)
                : 'Fecha desconocida'
            }
          </span>
        </div>
      </main>
    </article>
  );
};

export default Article;
