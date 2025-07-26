import prisma from "@/lib/prisma";

type Metadata = {
  seoTitle: string;
  seoDescription: string;
  seoRobots: string;
  author: { name: string };
  publishedAt: Date | null;
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
    });

    if (!metadata) {
      return {
        ok: false,
        metadata: null,
        message: "Article not found with slug: " + slug,
      };
    }

    return {
      ok: true,
      metadata: {
        seoTitle: metadata.seoTitle as string,
        seoDescription: metadata.seoDescription as string,
        seoRobots: metadata.seoRobots as string,
        author: {
          name: metadata.author.name as string
        },
        publishedAt: metadata.publishedAt,
        imageUrl: metadata.imageURL as string,
        category: {
          slug: metadata.category?.slug as string
        }
      },
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
