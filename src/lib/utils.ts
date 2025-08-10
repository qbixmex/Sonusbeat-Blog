import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from 'date-fns/format';
import { Locale, es } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length === 0) return '';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
};

export const createSlug = (title: string): string => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[¿?!¡|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const renderRobots = (robots: string): string => {
  switch (robots) {
    case 'index_follow':
      return 'Indexar y Seguir';
    case 'noindex_follow':
      return 'No Indexar y Seguir';
    case 'index_nofollow':
      return 'Indexar y No Seguir';
    case 'noindex_nofollow':
      return 'No Indexar y No Seguir';
    default:
      return "No definido";
  }
};

export const renderSeoRobots = (robots: string): string => {
  switch (robots) {
    case 'index_follow':
      return 'index, follow';
    case 'noindex_follow':
      return 'noindex, follow';
    case 'index_nofollow':
      return 'index, nofollow';
    case 'noindex_nofollow':
      return 'noindex, nofollow';
    default:
      return "noindex, nofollow";
  }
};

export const getFirstAndLastName = (full_name: string): string => {
  const names = full_name.split(' ');
  if (full_name.length === 0) return '';
  
  // If there's only one name, return the first letter capitalized
  // For example: "Daniel" should return "D" and no last name was provided
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return `${names.at(0)} ${names.at(1)}`;
};

export const articleFormatDate = (date: Date | string, lang?: Locale): string => {
  const jsDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(jsDate.getTime())) return 'Fecha desconocida';

  // Detectar idioma para el formato
  const isSpanish = lang === es;
  const formatStr = isSpanish ? "d MMMM yyyy" : "MMMM d yyyy";

  let formatted = format(jsDate, formatStr, { locale: lang });

  // Capitalizar mes en español
  if (isSpanish) {
    formatted = formatted.replace(
      /(\d+)\s([a-záéíóúñ]+)\s(\d{4})/,
      (_, day, month, year) =>
        `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`
    );
  }

  return formatted;
};

/**
 * Capitalizes the first letter of a string.
 * @param text - The text to capitalize
 * @example ```typescript
 * capitalizeFirstLetter("music");
 * // Returns "Music"
 * ```
 * @returns The capitalized text
 */
export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};