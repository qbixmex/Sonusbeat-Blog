"use server";

import prisma from "@/lib/prisma";
import uploadImage from "./upload-image.action";

export const uploadContentImage = async (file: File, articleId: string) => {
  if (!articleId) {
    throw new Error("No articleId provided");
  }

  const imageUploaded = await uploadImage(file!, 'articles');

  if (!imageUploaded) {
    throw 'Error uploading image to cloudinary';
  }

  await prisma.article.update({
    where: { id: articleId },
    data: {
      images: {
        push: imageUploaded.secureUrl,
      }
    },
  });

  return {
    message: 'Image uploaded successfully 👍',
    imageURL: imageUploaded.secureUrl,
  }
};

export default uploadContentImage;
