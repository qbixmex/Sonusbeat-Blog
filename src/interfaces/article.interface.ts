export type Robots =
  'index_follow'
  | 'noindex_follow'
  | 'index_nofollow'
  | 'noindex_nofollow'

export interface Article {
  id?: string;
  title: string;
  imageURL: string | null;
  imageAlt: string | null;
  imagePublicID?: string;
  images?: string[];
  slug: string;
  description: string;
  content: string;
  author?: {
    id: string;
    name: string;
  } | string;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoRobots: Robots;
  publishedAt: Date;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PublicArticle {
  id: string;
  title: string;
  imageURL: string;
  imageAlt: string;
  slug: string;
  description: string;
  author: {
    name: string;
    username: string;
  };
  category: {
    name: string;
    slug: string;
  };
  content: string;
  seoTitle: string;
  seoDescription: string;
  seoRobots: Robots;
  publishedAt: Date;
}

export interface PublicArticleForHomePage {
  id: string;
  title: string;
  imageURL: string;
  imageAlt: string;
  slug: string;
  description: string;
  author: {
    name: string;
    username: string;
  };
  category: {
    name: string;
    slug: string;
  };
  publishedAt: Date;
}