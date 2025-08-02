import prisma from "@/lib/prisma";

type Metadata = {
  seoRobots: string;
  author: { name: string };
  publishedAt: Date | null;
  imageUrl: string;
  translations: {
    language: string;
    slug: string;
    seoTitle: string;
    seoDescription: string;
  }[];
  category: {
    translations: {
      language: string;
      slug: string;
    }[];
  };
};

type ResponseFetchArticleMetadata = {
  ok: boolean;
  metadata: Metadata | null;
  message: string;
};

export const getArticleMetadataBySlug = async (slug: string): Promise<ResponseFetchArticleMetadata> => {
  try {
    const metadata = await prisma.article.findFirst({
      where: {
        translations: {
          some: { slug },
        },
      },
      select: {
        seoRobots: true,
        author: {select: { name: true }},
        imageURL: true,
        publishedAt: true,
        category: {
          select: {
            translations: {
              select: {
                language: true,
                slug: true,
              }
            }
          },
        },
        translations: {
          select: {
            language: true,
            slug: true,
            seoTitle: true,
            seoDescription: true,
          }
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
        seoRobots: metadata.seoRobots as string,
        author: {
          name: metadata.author.name as string
        },
        publishedAt: metadata.publishedAt,
        imageUrl: metadata.imageURL as string,
        category: {
          translations: metadata.category?.translations.map((translation) => ({
            language: translation.language,
            slug: translation.slug,
          })) ?? [],
        },
        translations: metadata.translations.map((translation) => ({
          slug: translation.slug,
          language: translation.language,
          seoTitle: translation.seoTitle,
          seoDescription: translation.seoDescription,
        })),
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
