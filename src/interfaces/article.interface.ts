type Robots =
  'index_follow'
  | 'noindex_follow'
  | 'index_nofollow'
  | 'noindex_nofollow'

export interface Article {
  id?: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  imageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoRobots: Robots;
  publishedAt: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicArticlesList {
  id: string;
  title: string;
  image: string;
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
  seoTitle: string;
  seoDescription: string;
  seoRobots: Robots;
  publishedAt: Date;
}

export interface PublicArticle {
  id: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  seoRobots: Robots;
  publishedAt: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}