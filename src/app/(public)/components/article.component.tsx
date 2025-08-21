'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from '@/root/src/i18n/navigation';
import { isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { articleFormatDate, cn } from '@/lib/utils';
import { CalendarDays, ChevronsDownUp, Ellipsis, Folder, User } from 'lucide-react';
import { Button } from '@/root/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PublicArticleForHomePage } from '@/interfaces/article.interface';
import styles from './article.module.css';

type Props = Readonly<{
  article: PublicArticleForHomePage;
  locale: string;
  feature?: boolean;
  className?: string;
}>;

const CHARACTERS_LENGTH = 110;

export const Article: FC<Props> = ({ article, feature = false, locale, className }) => {
  const router = useRouter();
  const articleTranslation = article.translations.find(t => t.language === locale);
  const categoryTranslation = article.category.translations?.find(t => t.language === locale);

  if (!articleTranslation || !categoryTranslation) {
    router.replace("/");
  }

  const [fullDescription, setFullDescription] = useState(false);

  // Data Fallbacks
  const articleTitle = articleTranslation?.title ?? 'No title provided';
  const articleDescription = articleTranslation?.description ?? 'No description provided';
  const articleSlug = articleTranslation?.slug ?? 'no-article';
  const articleImageAlt = articleTranslation?.imageAlt ?? 'No Image';
  const categoryName = categoryTranslation?.name ?? 'No Category';
  const categorySlug = categoryTranslation?.slug ?? 'no-category';

  return (
    <article className={cn(className, styles.article)}>
      <header>
        <Link href={`/${locale}/${categorySlug}/${articleSlug}`}>
          <Image
            src={
              article.imageURL.startsWith("https")
                ? article.imageURL
                : `/images/blog/${article.imageURL}`
            }
            alt={articleImageAlt}
            width={feature ? 1280 : 512}
            height={feature ? 720 : 384}
            className={`object-cover w-full ${feature ? 'h-[400px]' : 'h-auto'}`}
          />
        </Link>
      </header>
      <main className={styles.articleMain}>
        <h2 className={styles.articleTitle}>
          <Link href={`/${locale}/${categorySlug}/${articleSlug ?? "no-article"}`}>
            {articleTitle}
          </Link>
        </h2>

        <div className={styles.articleContent}>
          <span className={styles.articleDescription}>
            {
              fullDescription
                ? articleDescription
                : (articleDescription.length < CHARACTERS_LENGTH) || feature
                  ? articleDescription
                  : `${articleDescription.slice(0, CHARACTERS_LENGTH)}`
            }
          </span>
          {
            ((articleDescription.length > CHARACTERS_LENGTH) && !feature) && (
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
                    className={styles.articleContentTooltip}
                    arrowClassName={styles.articleContentTooltipArrow}
                  >
                    {fullDescription ? "Collapse" : "View more"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          }
        </div>

        <section className={styles.articleData}>
          <div className={styles.articleDataRow}>
            <Folder className={styles.articleDataIcon} />
            <Link
              href={`/${locale}/${categorySlug}`}
              className={styles.articleLink}
            >
              {categoryName}
            </Link>
          </div>
          <div className={styles.articleDataRow}>
            <CalendarDays className={styles.articleDataIcon} />
            <span className={styles.articleDataText}>
              {
                isValid(article.publishedAt)
                  ? articleFormatDate(
                    article.publishedAt,
                    (locale === "es") ? es : undefined
                  )
                  : 'Fecha desconocida'
              }
            </span>
          </div>
          <div className={cn(styles.articleDataRow, 'hidden!')}>
            <User className={styles.articleDataIcon} />
            <span className={styles.articleDataText}>
              {article.author.name}
            </span>
          </div>
        </section>
      </main>
    </article>
  );
};

export default Article;
