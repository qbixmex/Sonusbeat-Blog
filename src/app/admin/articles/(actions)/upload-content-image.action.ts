"use server";

import prisma from "@/lib/prisma";
import uploadImage from "./upload-image.action";
import { CloudinaryResponse } from "@/root/src/interfaces/cloudinary.interface";

type UploadArticleImageResponse = Promise<{
  message: string;
  cloudinaryResponse: CloudinaryResponse;
}>;

export const uploadContentImage = async (file: File, articleId: string): UploadArticleImageResponse => {
  if (!articleId) {
    throw new Error("No articleId provided");
  }

  const imageUploaded = await uploadImage(file!, 'articles');

  if (!imageUploaded) {
    throw new Error('Error uploading image to cloudinary');
  }

  await prisma.article.update({
    where: { id: articleId },
    data: {
      articleImages: {
        create: {
          imageUrl: imageUploaded.secureUrl,
          publicId: imageUploaded.publicId,
        }
      }
    },
  });

  return {
    message: 'Image uploaded successfully 👍',
    cloudinaryResponse: imageUploaded,
  }
};

export default uploadContentImage;
