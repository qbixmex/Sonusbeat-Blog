export interface CategoryTranslation {
  id?: string;
  categoryId?: string;
  language: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  translations: CategoryTranslation[];
  createdAt?: Date;
  updatedAt?: Date;
}
