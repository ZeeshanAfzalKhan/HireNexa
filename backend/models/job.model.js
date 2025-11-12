import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [100, "Title can't exceed 100 characters."],
    },

    description: {
      type: String,
      required: [true, "Job description is required."],
      minlength: [10, "Description must be at least 10 characters long."],
      maxlength: [5000, "Description can't exceed 5000 characters."],
    },

    skillRequired: {
      type: [String],
      required: [true, "At least one skill is required."],
      validate: {
        validator: function (skills) {
          if (!Array.isArray(skills)) return false;
          if (skills.length < 1 || skills.length > 50) return false;
          return skills.every(
            (s) => typeof s === "string" && s.length >= 2 && s.length <= 100
          );
        },
        message:
          "Each skill should be a string (2-100 chars), and total skills should be between 1 and 50.",
      },
    },

    salary: {
      type: Number,
      required: [true, "Salary is required."],
      min: [0, "Salary cannot be negative."],
    },

    experience: {
      type: Number,
      required: [true, "Experience is required."],
      min: [0, "Experience cannot be negative."],
      max: [50, "Experience seems unrealistic (max 50 years)."],
    },

    location: {
      type: String,
      required: [true, "Job location is required."],
    },

    jobType: {
      type: String,
      required: [true, "Job type is required."],
      enum: {
        values: ["Full-time", "Part-time", "Internship", "Remote", "Contract"],
        message: "Invalid job type.",
      },
    },

    position: {
      type: Number,
      required: [true, "Number of open positions is required."],
      min: [1, "There must be at least 1 open position."],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company reference is required."],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator reference is required."],
    },

    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
