import { type FC, use } from 'react';
import { Metadata } from 'next';
import PublicLayout from '@/app/(public)/public.layout';
import MainContainer from '@/components/main-container.component';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ArticlesList from '../../(public)/components/article-list.component';
import fetchPublicArticlesAction from '../../(public)/(actions)/fetch-articles.action';
import { getTranslations } from 'next-intl/server';
import fetchPublicCategoryAction from '../../(public)/(actions)/fetch-category.action';

type MetadataProps = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
  const { locale, category: categorySlug } = await params;

  const { category } = await fetchPublicCategoryAction(categorySlug);

  const categoryName = category?.translations.find(t => t.language === locale)?.name ?? "no category";
  const categoryTranslation = category?.translations.find((t) => t.language === locale);
  const translation = await getTranslations({ locale });
  const seoTitle = translation('CategoryPage.seoTitle', { category: categoryName });
  const seoDescription = translation('CategoryPage.seoDescription', { category: categoryName });

  return {
    title: seoTitle,
    description: seoDescription,
    robots: {
      index: true,
      follow: true,
    },
    // social media
    openGraph: {
      url: `${siteUrl}/${locale}/${categoryTranslation?.slug}`,
      title: seoTitle,
      description: seoDescription,
      type: "article",
      siteName: translation('SiteName'),
      locale,
      images: [`${siteUrl}/images/sonusbeat-logo.png`],
    },
  };
};

type Props = Readonly<{
  params: Promise<{
    locale: string;
    category: string;
  }>;
}>;

export const dynamic = 'force-dynamic';

const CategoryArticles: FC<Props> = ({ params }) => {
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

export default CategoryArticles;
