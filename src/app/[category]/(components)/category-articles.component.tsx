'use client';

import { FC } from 'react';
import { capitalizeFirstLetter } from "@/lib/utils";
import { useParams } from 'next/navigation';

export const CategoryArticles: FC = () => {

  const params = useParams<{ category: string; }>();

  return (
    <>
      <h1>{capitalizeFirstLetter(params.category)} Articles</h1>
    </>
  );

};

export default CategoryArticles;
