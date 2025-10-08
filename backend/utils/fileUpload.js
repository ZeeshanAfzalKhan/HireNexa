// utils/fileUploader.js
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({})

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Allowed MIME types for image + PDF
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "application/pdf",
];

// ✅ Multer setup (in-memory)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter,
});

// ✅ Upload directly to Cloudinary
export const uploadToCloudinary = (file, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) return reject(new Error("No file buffer found"));

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "HireNexa",
        resource_type: "auto", // detects pdf or image automatically
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// ✅ Delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw error;
  }
};