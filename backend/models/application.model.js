import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job reference is required."],
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Applicant reference is required."],
    },

    coverLetter: {
      type: String,
      trim: true,
      maxlength: [5000, "Cover letter cannot exceed 5000 characters."],
    },

    resume: {
      resumeOriginalName: { type: String },
      resumeURL: {
        type: String,
        validate: {
          validator: (v) => !v || /^https?:\/\/[^\s]+$/.test(v),
          message: "Invalid resume URL.",
        },
      },
      resumePublicId: { type: String },
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "{VALUE} is not a valid application status.",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate applications for the same job by the same applicant
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;



