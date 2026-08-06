import { Readable } from "stream";
import cloudinary from "../config/cloudinary";
import { resolve } from "dns";
import { error } from "console";

export const uploadToCloudinary = (buffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};
