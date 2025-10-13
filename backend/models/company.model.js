import mongoose from "mongoose";
import validator from "validator";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required."],
      unique: true,
      trim: true,
      minlength: [2, "Company name must be at least 2 characters long."],
      maxlength: [100, "Company name cannot exceed 100 characters."],
    },

    description: {
      type: String,
      required: [true, "Company description is required."],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long."],
      maxlength: [2000, "Description cannot exceed 2000 characters."],
    },

    website: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: "Invalid company website URL.",
      },
    },

    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters."],
    },

    logo: {
      logoOriginalName: { type: String, trim: true },
      logoURL: {
        type: String,
        validate: {
          validator: (v) => !v || validator.isURL(v),
          message: "Invalid logo URL.",
        },
      },
      logoPublicId: { type: String },
    },

    verified: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required."],
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
