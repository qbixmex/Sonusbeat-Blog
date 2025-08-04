import { use, type FC } from 'react';
import PublicLayout from '@/app/(public)/public.layout';
import MainContainer from '@/components/main-container.component';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ArticlesList from '../../(public)/components/article-list.component';
import fetchPublicArticlesAction from '../../(public)/(actions)/fetch-articles.action';

export const dynamic = 'force-dynamic';

type Props = Readonly<{
  params: Promise<{
    locale: string;
    category: string;
  }>;
}>;

const CategoryArticules: FC<Props> = ({ params }) => {
  const { locale, category } = use(params);

  const translate = useTranslations('CategoryPage');

  // Enable static rendering
  setRequestLocale(locale);

  const response = use(fetchPublicArticlesAction({ category }));
  const articles = response.articles ?? [];

  // Get the category translations from the first article.
  const categoryTranslations = articles[0]?.category?.translations ?? [];

  const categoryName =
    categoryTranslations.find(t => t.language === locale)?.name ?? 'no category';

  // Generate urlParams dynamically based on the category translations.
  const urlParams = categoryTranslations.map(translation => ({
    locale: translation.language,
    category: translation.slug,
  }));

  return (
    <PublicLayout urlParams={urlParams}>
      <MainContainer>
        <h1 className="text-5xl font-black mb-10">
          {translate('title', { category: categoryName })}
        </h1>
        <ArticlesList articles={articles} locale={locale} />
      </MainContainer>
    </PublicLayout>
  );

};

export default CategoryArticules;
