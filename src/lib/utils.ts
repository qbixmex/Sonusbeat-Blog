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
  const names = full_name.trim().split(/\s+/);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0]} ${names[1]}`;
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

/**
 * Slugifies a string by converting it to a URL-friendly format.
 * @param name - The name to slugify
 * @example ```typescript
 * slugify("how to use the best image ever.png");
 * // Returns "how-to-use-the-best-image-ever"
 * ```
 * @returns The slugified name
 */
export const slugify = (name: string): string => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\.[^/.]+$/, "") // removes extension
    .trim() // removes trailing spaces
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ""); // remove leading and trailing dashes
}

/**
 * Pads a number with leading zeros.
 * @param n - The number to pad
 * @param d - The desired length of the output string
 * @example ```typescript
 * pad(5);
 * // Returns "05"
 * ```
 * @returns The padded number as a string
 */
export const pad = (n: number, d = 2) => n.toString().padStart(d, '0');
