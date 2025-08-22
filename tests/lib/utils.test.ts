import { getInitials, createSlug, renderRobots, renderSeoRobots, getFirstAndLastName, articleFormatDate, capitalizeFirstLetter, slugify, pad } from '@/lib/utils';
import { es } from 'date-fns/locale';
import { expect } from 'vitest';

describe('Tests on Utils', () => {
  test('Should getInitials', () => {
    const testName = 'Daniel Gonzalez';
    const initials = getInitials(testName);
    expect(initials).toBe('DG');
  });

  test('Should create an slug', () => {
    let testTitle = 'The best books';

    expect(createSlug(testTitle)).toBe('the-best-books');

    testTitle = '  How many year needs to be a developer ? ';

    expect(createSlug(testTitle)).toBe('how-many-year-needs-to-be-a-developer');

    testTitle = '¿ Cual es el mejor sitio web ?';

    expect(createSlug(testTitle)).toBe('cual-es-el-mejor-sitio-web');

    testTitle = '! LOREM IPSUM !';
    
    expect(createSlug(testTitle)).toBe('lorem-ipsum');

    testTitle = 'LOREM | IPSUM';

    expect(createSlug(testTitle)).toBe('lorem-ipsum');
  });

  test('Should render Robots Labels', () => {
    expect(renderRobots('index_follow')).toBe('Indexar y Seguir');
    expect(renderRobots('index_nofollow')).toBe('Indexar y No Seguir');
    expect(renderRobots('noindex_follow')).toBe('No Indexar y Seguir');
    expect(renderRobots('noindex_follow')).toBe('No Indexar y Seguir');
    expect(renderRobots('noindex_nofollow')).toBe('No Indexar y No Seguir');
    expect(renderRobots('lorem_ipsum')).toBe('No definido');
  });

  test('Should render Seo Robots', () => {
    expect(renderSeoRobots('index_follow')).toBe('index, follow');
    expect(renderSeoRobots('index_nofollow')).toBe('index, nofollow');
    expect(renderSeoRobots('noindex_follow')).toBe('noindex, follow');
    expect(renderSeoRobots('noindex_nofollow')).toBe('noindex, nofollow');
    expect(renderSeoRobots('lorem_ipsum')).toBe('noindex, nofollow');
    expect(renderSeoRobots('')).toBe('noindex, nofollow');
    expect(renderSeoRobots('lorem_ipsum')).toBe('noindex, nofollow');
  });

  test('Should Get First and Last Name', () => {
    expect(getFirstAndLastName('')).toBe('');
    expect(getFirstAndLastName('Daniel González')).toBe('Daniel González');
    expect(getFirstAndLastName('Daniel')).toBe('D');
  });

  test('Should format date correctly in spanish', () => {
    const publishedDate = new Date('2024-09-08T08:44:35.235Z');
    const formattedDate = articleFormatDate(publishedDate, es);
    expect(formattedDate).toBe('8 Septiembre 2024');
  });

  test('Should format date correctly in english', () => {
    const publishedDate = new Date('2024-09-08T08:44:35.235Z');
    const formattedDate = articleFormatDate(publishedDate);
    expect(formattedDate).toBe('September 8 2024');
  });

  test('Should capitalize first letter', () => {
    const testCase = 'lorem ipsum';
    const capitalizedText = capitalizeFirstLetter(testCase);
    expect(capitalizedText).toBe('Lorem ipsum');
  });

  test('Should slugify text correctly', () => {
    expect(slugify('adhana festival !')).toBe('adhana-festival');
    expect(slugify('la acción - debe ser así')).toBe('la-accion-debe-ser-asi');
  });

  test('Should return a padded number', () => {
    expect(pad(5)).toBe('05');
    expect(pad(42)).toBe('42');
    expect(pad(123, 5)).toBe('00123');
  });
});