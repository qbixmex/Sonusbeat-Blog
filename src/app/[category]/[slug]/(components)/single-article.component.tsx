'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns/format';
import ReactMarkdown from "react-markdown";
import { User, FolderOpen, CalendarDays } from 'lucide-react';
import { cn } from '@/root/src/lib/utils';
import { PublicArticle } from '@/interfaces/article.interface';
import styles from './styles.module.css';
import Divider from '@/components/divider.component';

type Props = Readonly<{
  article: PublicArticle;
}>;

export const SingleArticle: FC<Props> = ({ article }) => {
  return (
    <article>
      <header className={styles.header}>
        <h1 className={cn(["text-primary", styles.headerTitle])}>
          {article.title}
        </h1>
        <Image
          src={
            article.imageURL.startsWith("https")
            ? article.imageURL
            : `/images/blog/${article.imageURL}`
          }
          alt={article.imageAlt}
          width={1200}
          height={600}
          className={styles.headerImage}
        />
        <section className={cn(["order-3", styles.headerInfo])}>
          <section className={styles.headerInfoSection}>
            <User className={styles.headerInfoIcon} />
            <Link
              className={styles.headerInfoLink}
              href={`/author/${article.author.username}`}
            >
              {article.author.name}
            </Link>
          </section>
          <section className={styles.headerInfoSection}>
            <FolderOpen className={styles.headerInfoIcon} />
            <Link
              className={styles.headerInfoLink}
              href={`/${article.category.slug}/articles`}
            >
              {article.category.name}
            </Link>
          </section>
          <section className={styles.headerInfoSection}>
            <CalendarDays className={styles.headerInfoIcon} />
            <p className={styles.headerInfoDate}>
              {
                article.publishedAt
                  ? format(new Date(article.publishedAt), 'MMMM dd, yyyy')
                  : 'Fecha desconocida'
              }
            </p>
          </section>
        </section>
      </header>

      <section className={styles.articleDescription}>
        {article.description}
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
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </section>
      </main>
    </article>
  );

};

export default SingleArticle;
