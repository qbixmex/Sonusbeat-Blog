import { Category } from "./category.interface";

export type Robots =
  'index_follow'
  | 'noindex_follow'
  | 'index_nofollow'
  | 'noindex_nofollow'

export interface Article {
  id?: string;
  imageURL: string | null;
  imagePublicID?: string;
  images?: string[];
  author?: {
    id: string;
    name: string;
  } | string;
  category: Category | string;
  seoRobots: Robots;
  publishedAt: Date;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  translations: ArticleTranslation[];
}

interface ArticleTranslation {
  language: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PublicArticle {
  id: string;
  imageURL: string;
  author: {
    name: string;
    username: string;
  };
  category: {
    translations: CategoryTranslation[];
  };
  seoRobots: Robots;
  publishedAt: Date;
  translation: ArticleTranslation | null;
  allTranslations: {
    language: string;
    slug: string;
  }[];
}

export interface CategoryTranslation {
  language: string;
  name: string;
  slug: string;
};

export interface PublicArticleForHomePage {
  id: string;
  imageURL: string;
  author: {
    name: string;
    username: string;
  };
  category: {
    translations: {
      language: string;
      slug: string;
      name: string;
    }[],
  };
  publishedAt: Date;
  translations: {
    language: string;
    title: string;
    slug: string;
    description: string;
    imageAlt: string;
    seoTitle: string;
    seoDescription: string;
  }[],
}