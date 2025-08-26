'use client';

import { FC } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import styles from './styles.module.css';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { generatePaginationNumbers } from '@/lib/generate-pagination-numbers';

type Props = Readonly<{
  totalPages: number;
}>;

export const PaginationLinks: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? '1';
  const currentPage = isNaN(+pageString) ? 1 : +pageString;
  const allPages = generatePaginationNumbers(currentPage, totalPages);

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
    <section className={styles.pagination}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              title=""
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {allPages.map((page, index) => (
            <PaginationItem key={page + '-' + index}>
              {
                (page !== '...')
                  ? (
                    <PaginationLink
                      href={createPageUrl(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  )
                  : (<PaginationEllipsis />)
              }
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              title=""
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );

};

export default Pagination;
