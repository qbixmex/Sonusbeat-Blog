'use client';

import { FC } from 'react';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { generatePaginationNumbers } from '@/lib/generate-pagination-numbers';
import styles from './styles.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = Readonly<{
  totalPages: number;
}>;

export const PublicPagination: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('page') ?? '1';
  const currentPage = isNaN(+pageString) ? 1 : +pageString;
  const allPages = generatePaginationNumbers(currentPage, totalPages);
  const translate = useTranslations('Pagination');

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      // example: "/admin/articles?page=1"
      return `${pathname}${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      // example: "/admin/articles"
      return `${pathname}`;
    }

    if (Number(pageNumber) > totalPages) {
      // example: "/admin/articles?page=4"
      // if there's no more articles, stay in the same page
      return `${pathname}${params.toString()}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Page navigation" className={styles.pagination}>
      <ul className={styles.paginationList}>
        <li>
          {
            (currentPage === 1)
              ? (
                <span className={styles.paginationPrevDisabled}>
                  {translate('prev')}
                </span>
              ) : (
                <Link
                  href={createPageUrl(currentPage - 1)}
                  className={styles.paginationPrevious}>
                  {translate('prev')}
                </Link>
              )
          }
        </li>
        {allPages.map((page, index) => (
          <li key={`${page}-${index}`}>
            <Link
              href={createPageUrl(page)}
              className={(page === currentPage)
                ? styles.paginationCurrentPage
                : styles.paginationPage
              }
            >
              {page !== '...' ? page : '...'}
            </Link>
          </li>
        ))}
        <li>
          {
            (currentPage === totalPages)
              ? (
                <span className={styles.paginationNextDisabled}>
                  {translate('next')}
                </span>
              ) : (
                <Link
                  href={createPageUrl(currentPage + 1)}
                  className={styles.paginationNext}
                >
                  {translate('next')}
                </Link>
              )
          }
        </li>
      </ul>
    </nav>
  );
};

export default PublicPagination;
