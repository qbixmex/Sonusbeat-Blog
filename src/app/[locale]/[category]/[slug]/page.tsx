import { FC } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import PublicLayout from "@/app/(public)/public.layout";
import MainContainer from "@/components/main-container.component";
import { SingleArticle } from "./(components)/single-article.component";
import { fetchPublicArticleAction } from "@/app/(public)/(actions)/fetch-article.action";
import { getStaticArticlesSlugs } from "@/app/(public)/(actions)/fetch-static-slugs.action";
import { getArticleMetadataBySlug } from "@/app/(public)/(actions)/fetch-article-metadata";
import { renderSeoRobots } from "@/lib/utils";

type Props = Readonly<{
  params: Promise<{ slug: string; }>;
}>;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const slug = (await params).slug;

  // fetch data
  const { metadata } = await getArticleMetadataBySlug(slug);

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
      siteName: "Sonusbeat Blog",
      locale: "es_MX",
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

  const result = await getStaticArticlesSlugs(100);

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.slugs.map((permalink) => ({ permalink }));
};

//* This re-validates the page every 7 days
export const revalidate = 604800;

const ArticlePage: FC<Props> = async ({ params }) => {  
  const slug = (await params).slug;

  const response = await fetchPublicArticleAction(slug);

  if (!response.ok || !response.article) {
    redirect("/");
  }


  const article = response.article;

  return (
    <PublicLayout>
      <MainContainer>
        <SingleArticle article={article} />
      </MainContainer>
    </PublicLayout>
  );
};

export default ArticlePage;
