import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadAvatar = async (filepath: string) => {
  const options = {
    folder: "task-manager/avatars",
    use_filename: true,
    unique_filename: false,
  };

  try {
    const result = await cloudinary.uploader.upload(filepath, options);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default uploadAvatar;
