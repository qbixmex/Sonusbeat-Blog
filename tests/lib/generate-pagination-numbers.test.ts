import { generatePaginationNumbers } from '@/lib/generate-pagination-numbers';

describe('Tests on generatePaginationNumbers', () => {
  test('Should return total pages without ellipsis', () => {
    const currentPage = 3;
    const totalPages = 5;
    const array = generatePaginationNumbers(currentPage, totalPages);

    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  test('Should return the first three ones + ellipsis + last two ones', () => {
    const currentPage = 3;
    const totalPages = 100;
    const array = generatePaginationNumbers(currentPage, totalPages);

    expect(array).toEqual([1, 2, 3, '...', 99, 100]);
  });

  test('Should return the first two ones + ellipsis + last 3 ones', () => {
    const currentPage = 98;
    const totalPages = 100;
    const array = generatePaginationNumbers(currentPage, totalPages);

    expect(array).toEqual([1, 2, '...', 98, 99, 100]);
  });

  test('Should return the first one + ellipsis + current page + neighbors', () => {
    const currentPage = 50;
    const totalPages = 100;
    const array = generatePaginationNumbers(currentPage, totalPages);

    expect(array).toEqual([1, '...', 49, 50, 51, '...', 100]);
  });
});