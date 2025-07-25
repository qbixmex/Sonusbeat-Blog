import prisma from "@/lib/prisma";

type Metadata = {
  seoTitle: string;
  seoDescription: string;
  seoRobots: string;
  author: { name: string };
  publishedAt: Date;
  imageUrl: string;
  category: { slug: string };
};

type ResponseFetchArticleMetadata = {
  ok: boolean;
  metadata: Metadata | null;
  message: string;
};

export const getArticleMetadataBySlug = async (slug: string): Promise<ResponseFetchArticleMetadata> => {
  try {
    const metadata = await prisma.article.findUnique({
      where: { slug: slug },
      select: {
        seoTitle: true,
        seoDescription: true,
        seoRobots: true,
        author: {select: { name: true }},
        imageURL: true,
        publishedAt: true,
        category: {
          select: { slug: true }
        }
      }
    }) as Metadata | null;

    if (!metadata) {
      return {
        ok: false,
        metadata: null,
        message: "Article not found with slug: " + slug,
      };
    }

    return {
      ok: true,
      metadata,
      message: "Article fetched successfully 👍",
    };
  } catch(error) {
    console.error(error);
    return {
      ok: false,
      metadata: null,
      message: "Something went wrong !, check logs for details",
    };
  }
};
