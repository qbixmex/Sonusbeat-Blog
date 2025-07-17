"use server";

// import { CloudinaryResponse } from "@/interfaces";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const deleteImage = async (publicId: string): Promise<{ ok: boolean }> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
};

export default deleteImage;
