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
export const uploadToCloudinary = (file, folder = "HireNexa") => {
  return new Promise((resolve) => {
    try {
      // 1) Basic validation
      if (!file || !file.buffer) {
        console.warn("uploadToCloudinary: missing file or buffer");
        return resolve({ success: false, message: "No file buffer found" });
      }

      // 2) Optional: MIME type whitelist (reuse allowedMimeTypes from this file if present)
      const allowed = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
        "application/pdf",
      ];
      if (!file.mimetype || !allowed.some((t) => file.mimetype.startsWith(t))) {
        console.warn("uploadToCloudinary: unsupported mimetype", file.mimetype);
        return resolve({
          success: false,
          message: "Only image and PDF files are allowed",
        });
      }

      // 3) Safety guards for long-running uploads
      let finished = false;
      const TIMEOUT_MS = 30_000; // 30s timeout (adjust if needed)
      const timeout = setTimeout(() => {
        if (finished) return;
        finished = true;
        console.error("uploadToCloudinary: upload timed out");
        resolve({ success: false, message: "Upload timed out" });
      }, TIMEOUT_MS);

      // 4) Create upload stream with the provided folder
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder || "HireNexa",
          resource_type: "auto",
        },
        (error, result) => {
          if (finished) return;
          finished = true;
          clearTimeout(timeout);

          if (error) {
            console.error("uploadToCloudinary: cloudinary error:", error);
            return resolve({
              success: false,
              message: "Cloudinary upload error",
              error,
            });
          }

          // success — normalize the returned fields
          return resolve({
            success: true,
            message: "File uploaded successfully",
            url: result.secure_url || result.url,
            public_id: result.public_id,
            original_filename: result.original_filename || result.public_id,
            resource_type: result.resource_type,
            format: result.format,
            rawResult: result, // optional: full cloudinary response
          });
        }
      );

      // 5) Handle stream errors (read stream & upload stream)
      const readStream = streamifier.createReadStream(file.buffer);

      readStream.on("error", (err) => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        console.error("uploadToCloudinary: read stream error:", err);
        return resolve({
          success: false,
          message: "File read error",
          error: err,
        });
      });

      uploadStream.on("error", (err) => {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        console.error("uploadToCloudinary: upload stream error:", err);
        return resolve({
          success: false,
          message: "Upload stream error",
          error: err,
        });
      });

      // 6) Start piping
      readStream.pipe(uploadStream);
    } catch (err) {
      console.error("uploadToCloudinary: unexpected error:", err);
      return resolve({
        success: false,
        message: "Unexpected error while uploading",
        error: err,
      });
    }
  });
};


// ✅ Delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    // ✅ 1. Check if the publicId is provided and valid
    if (!publicId || typeof publicId !== "string" || !publicId.trim()) {
      console.warn("⚠️ deleteFromCloudinary called without valid public_id");
      return { success: false, message: "Invalid public_id" };
    }

    // ✅ 2. Attempt deletion
    const result = await cloudinary.uploader.destroy(publicId);

    // ✅ 3. Cloudinary returns an object like { result: 'ok' } if successful
    if (result.result === "ok") {
      return { success: true, message: "File deleted successfully", result };
    } else {
      console.warn("⚠️ Cloudinary deletion failed:", result);
      return { success: false, message: "Cloudinary deletion failed", result };
    }
  } catch (error) {
    console.error("❌ Error deleting file from Cloudinary:", error);
    return { success: false, message: error.message || "Error deleting file" };
  }
};
