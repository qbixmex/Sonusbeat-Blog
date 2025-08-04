'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { es, enUS } from 'date-fns/locale';
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/tokyo-night-dark.min.css";
import { User, FolderOpen, CalendarDays } from 'lucide-react';
import { articleFormatDate, cn } from '@/root/src/lib/utils';
import { PublicArticle } from '@/interfaces/article.interface';
import styles from './styles.module.css';
import Divider from '@/components/divider.component';
import rehypeRaw from "rehype-raw";
import rehypeYoutube from '@/lib/rehype-youtube';
import { isValid } from 'date-fns';

type Props = Readonly<{
  article: PublicArticle;
}>;

export const SingleArticle: FC<Props> = ({ article }) => {
  const lang = article.translation?.language ?? 'en';
  const category = article.category.translations.find((t) => t.language === lang);

  const imageURL = article.imageURL && article.imageURL.startsWith("https")
    ? article.imageURL
    : `/images/blog/${article.imageURL}`;

  return (
    <article>
      <header className={styles.header}>
        <h1 className={cn(["text-primary", styles.headerTitle])}>
          {article.translation?.title ?? "No Title Available"}
        </h1>
        <Image
          src={imageURL}
          alt={article.translation?.imageAlt ?? "No Image Alt Available"}
          width={1200}
          height={600}
          className={styles.headerImage}
        />
        <section className={cn(["order-3", styles.headerInfo])}>
          <section className={styles.headerInfoSection}>
            <User className={styles.headerInfoIcon} />
            <Link
              // TODO: href={`/author/${article.author.username}`}
              className={styles.headerInfoLink}
              href="#"
            >
              {article.author.name}
            </Link>
          </section>
          <section className={styles.headerInfoSection}>
            <FolderOpen className={styles.headerInfoIcon} />
            <Link
              href={`/${lang}/${category?.slug}`}
              className={styles.headerInfoLink}
            >
              { category?.name ?? "No Category Available" }
            </Link>
          </section>
          <section className={styles.headerInfoSection}>
            <CalendarDays className={styles.headerInfoIcon} />
            <p className={styles.headerInfoDate}>
              {
                isValid(article.publishedAt)
                  ? articleFormatDate(
                    article.publishedAt,
                    lang === 'es' ? es : enUS
                  )
                  : 'Fecha desconocida'
              }
            </p>
          </section>
        </section>
      </header>

      <section className={styles.articleDescription}>
        {article.translation?.description ?? "No description available."}
      </section>

      <Divider />

      <main>
        <section
          className={cn([
            "prose",
            "prose-lg",
            "dark:prose-invert",
            styles.articleContent,
          ])}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeYoutube]}
          >
            {article.translation?.content ?? "No content available."}
          </ReactMarkdown>
        </section>
      </main>
    </article>
  );

};

export default SingleArticle;
