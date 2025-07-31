import { type FC } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import PublicLayout from "@/app/(public)/public.layout";
import MainContainer from "@/components/main-container.component";
import { SingleArticle } from "./(components)/single-article.component";
import { fetchPublicArticleAction } from "@/app/(public)/(actions)/fetch-article.action";
import { getStaticArticlesSlugs } from "@/app/(public)/(actions)/fetch-static-slugs.action";
import { getArticleMetadataBySlug } from "@/app/(public)/(actions)/fetch-article-metadata";
import { renderSeoRobots } from "@/lib/utils";

type Props = Readonly<{
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}>;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale, slug } = await params;

  // Fetch data
  const { metadata } = await getArticleMetadataBySlug(slug);

  // Translate Dynamic Content
  const t = await getTranslations({ locale });
  const siteNameTranslation = t('SiteName');

  const metaTitle = metadata?.seoTitle;
  const metaDescription = metadata?.seoDescription
    ? metadata?.seoDescription.length >= 160
      ? `${metadata?.seoDescription.slice(0, 157)} ...`
      : metadata?.seoDescription
    : "";
  const metaRobots = renderSeoRobots(metadata?.seoRobots as string);

  return {
    title: metaTitle,
    description: metaDescription,
    robots: metaRobots,
    authors: [{ name: metadata?.author.name }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    // social media
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      siteName: siteNameTranslation,
      locale,
      publishedTime: metadata?.publishedAt?.toISOString(),
      authors: [metadata?.author.name as string],
      images: [
        metadata?.imageUrl?.startsWith("https")
          ? metadata?.imageUrl
          : `/${metadata?.category.slug}/${metadata?.imageUrl}`,
      ],
    },
  }
};

//* ONLY BUILD TIME
export const generateStaticParams = async () => {
  const response = await getStaticArticlesSlugs(100);

  if (!response.ok) {
    throw new Error(response.error);
  }

  const params = response.articles.flatMap(article =>
    article.articleTranslations.map((articleTranslation) => {
      const categoryTranslation = article.categoryTranslations.find(
        (categoryTranslation) => categoryTranslation.language === articleTranslation.language
      );
      return {
        locale: articleTranslation.language,
        category: categoryTranslation ? categoryTranslation.slug : article.category,
        slug: articleTranslation.slug,
      };
    })
  );

  return params;
};

//* This re-validates the page every 7 days
export const revalidate = 604800;

const ArticlePage: FC<Props> = async ({ params }) => {
  const { slug, locale } = await params;

  const response = await fetchPublicArticleAction(slug, locale);

  if (!response.ok || !response.article) {
    redirect("/");
  }

  const article = response.article;

  // Generar urlParams dinámicamente según las traducciones del artículo y la categoría
  const urlParams = article.allTranslations.map(articleTranslation => {
    const categoryTranslation = article.category.translations.find((categoryTranslation) =>
      categoryTranslation.language === articleTranslation.language
    );
    return {
      locale: articleTranslation.language,
      category: categoryTranslation ? categoryTranslation.slug : article.category.slug,
      slug: articleTranslation.slug,
    };
  });

  return (
    <PublicLayout urlParams={urlParams}>
      <MainContainer>
        <SingleArticle article={article} />
      </MainContainer>
    </PublicLayout>
  );
};

export default ArticlePage;
