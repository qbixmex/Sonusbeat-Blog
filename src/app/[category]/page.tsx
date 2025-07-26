import { FC } from "react";
import { Metadata } from "next";
import CategoryArticles from "./(components)/category-articles.component";

export const metadata: Metadata = {
  robots: { index: false, follow: false, },
};

const CategoryPage: FC = () => {
  return (
    <CategoryArticles />
  );
};

export default CategoryPage;
