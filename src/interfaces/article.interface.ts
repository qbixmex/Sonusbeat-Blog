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
  category: string;
  imageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoRobots: Robots;
  publishedAt: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}