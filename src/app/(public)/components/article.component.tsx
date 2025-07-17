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
    <article className="mb-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
        <div className="w-full lg:max-w-[400px]">
          <Link href={`/${article.category.slug}/${article.slug}`}>
            <figure className="relative">
              <Image
                src={
                  article.imageURL.startsWith("https")
                  ? article.imageURL
                  : `/images/blog/${article.imageURL}`
                }
                alt={`${article.imageAlt} imagen`}
                width={1024}
                height={576}
                className="w-full max-w-[1024px] lg:max-w-[400px] h-auto object-cover rounded"
              />
              <span className="bg-black/80 inline-block text-neutral-50 rounded-bl rounded-tr absolute left-0 bottom-0 px-2 py-1">
                {article.category.name}
              </span>
            </figure>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            <Link href={`/${article.category.slug}/${article.slug}`}>
              {article.title}
            </Link>
          </h2>
          <div className="text-lg text-muted-foreground italic">
            <span className="leading-8 mr-2">
              {
                fullDescription
                  ? article.description
                  : article.description.length < 150
                    ? article.description
                    : `${article.description.slice(0, 150)} ...`
              }
            </span>
            {
              article.description.length > 150 && (
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
        </div>
      </div>
    </article>
  );
};

export default Article;
