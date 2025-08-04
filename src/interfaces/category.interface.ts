export interface Category {
  id?: string;
  translations: CategoryTranslation[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryTranslation {
  id?: string;
  categoryId?: string;
  language: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PublicCategoryForHomePage {
  translations: {
    language: string;
    name: string;
    slug: string;
  }[];
}