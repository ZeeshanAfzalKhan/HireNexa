import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileURL: {
      type: String,
      required: true,
      unique: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: {
        values: ["resume", "profilePhoto"],
        message: "{VALUE} is not a valid file type",
      },
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const File = mongoose.model("File", fileSchema);
