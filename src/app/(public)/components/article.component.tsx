'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { es } from 'date-fns/locale';
import { articleFormatDate } from '@/lib/utils';
import { CalendarDays, ChevronsDownUp, Ellipsis, Folder, User } from 'lucide-react';
import { Button } from '@/root/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import styles from './article.module.css';
import { PublicArticleForHomePage } from '@/interfaces/article.interface';

type Props = Readonly<{
  article: PublicArticleForHomePage;
  feature?: boolean;
}>;

const CHARACTERS_LENGTH = 110;

export const Article: FC<Props> = ({ article, feature = false }) => {
  const [fullDescription, setFullDescription] = useState(false);

  return (
    <article className="flex flex-col gap-5">
      <Link href={`/${article.category.slug}/${article.slug}`}>
        <Image
          src={
            article.imageURL.startsWith("https")
              ? article.imageURL
              : `/images/blog/${article.imageURL}`
          }
          alt={`${article.imageAlt} imagen`}
          width={720}
          height={480}
          className="object-cover w-full rounded"
        />
      </Link>

      <h2 className="text-xl font-semibold text-stone-700 md:text-2xl dark:text-stone-100">
        <Link href={`/${article.category.slug}/${article.slug}`}>
          {article.title}
        </Link>
      </h2>

      <div className="flex-1 text-lg text-stone-600 dark:text-stone-400 italic">
        <span className="leading-8 mr-2">
          {
            fullDescription
              ? article.description
              : (article.description.length < CHARACTERS_LENGTH) || feature
                ? article.description
                : `${article.description.slice(0, CHARACTERS_LENGTH)}`
          }
        </span>
        {
          ((article.description.length > CHARACTERS_LENGTH) && !feature) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFullDescription(!fullDescription)}
                    className="ml-1"
                  >
                    {fullDescription ? <ChevronsDownUp /> : <Ellipsis />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="bg-stone-900 text-stone-100 border-stone-700"
                  arrowClassName="bg-stone-900 fill-stone-900"
                >
                  {fullDescription ? "Colapsar" : "Ver más"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }
      </div>

      <section className={styles.articleData}>
        <div className={styles.articleDataRow}>
          <Folder className={styles.articleDataIcon} />
          <span className={styles.articleDataText}>
            {article.category.name}
          </span>
        </div>
        <div className={styles.articleDataRow}>
          <CalendarDays className={styles.articleDataIcon} />
          <span className={styles.articleDataText}>
            {
              article.publishedAt
                ? articleFormatDate(article.publishedAt, es)
                : 'Fecha desconocida'
            }
          </span>
        </div>
        <div className={styles.articleDataRow}>
          <User className={styles.articleDataIcon} />
          <span className={styles.articleDataText}>
            {article.author.name}
          </span>
        </div>
      </section>
    </article>
  );
};

export default Article;
