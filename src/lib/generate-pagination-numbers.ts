/**
 * Generate an array of pagination numbers to display.
 * @param currentPage - The current active page number.
 * @param totalPages - The total number of pages available.
 * @example
 * // Examples usage:
 * generatePaginationNumbers(1, 5);
 * generatePaginationNumbers(3, 10);
 * generatePaginationNumbers(5, 12);
 * @returns An array of page numbers to display in the pagination component.
 */
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // if total pages is 12 or less we show all pages without ellipsis
  if (totalPages <= 12) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is between the first three pages
  // show the first three ones + ellipsis + last two ones
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // if current page is at last ones,
  // show the first two ones + ellipsis + last 3 ones
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // if current page is different place
  // show the first one + ellipsis + current page + neighbors
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
};

export default generatePaginationNumbers;
