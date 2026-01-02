import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (imageFile, folder = "uploads") => {
  if (!imageFile) {
    return "";
  }

  const b64 = Buffer.from(imageFile.buffer).toString("base64");
  const dataURI = `data:${imageFile.mimetype};base64,${b64}`;
  const uploadResult = await cloudinary.uploader.upload(dataURI, {
    folder,
    resource_type: "auto",
  });

  return uploadResult.secure_url;
};

export default uploadToCloudinary;
