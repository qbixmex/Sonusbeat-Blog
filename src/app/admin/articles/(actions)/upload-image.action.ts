"use server";

import crypto from "node:crypto";
import { CloudinaryResponse } from "@/interfaces/cloudinary.interface";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImage = async (image: File, folder: 'users' | 'articles'): Promise<(CloudinaryResponse | null) | null> => {
  try {
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    
    const response = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
      folder: `/${folder}`,
      public_id: crypto.randomUUID(),
    });

    return {
      publicId: response.public_id,
      secureUrl: response.secure_url,
    };

  } catch (error) {
    console.error(error);
    return null;
  }
};

export default uploadImage;
