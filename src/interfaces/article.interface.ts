export interface Article {
  id?: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  category: string;
  imageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoRobots: string;
  publishedAt: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}