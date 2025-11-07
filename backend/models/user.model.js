import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: [2, "First name must be at least 2 characters long."],
      maxlength: [50, "First name cannot exceed 50 characters."],
      required: [true, "First name is required."],
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters."],
    },

    emailId: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please enter a valid email address.",
      },
    },

    phoneNumber: {
      type: String,
      validate: {
        validator: (value) =>
          !value || validator.isMobilePhone(value, "any", { strictMode: false }),
        message: "Please provide a valid phone number.",
      },
    },

    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long."],
      maxlength: [128, "Password cannot exceed 128 characters."],
      required: function () {
        return !this.isOAuthUser;
      },
    },

    isOAuthUser: {
      type: Boolean,
      default: false,
    },

    // Store multiple OAuth2 provider details
    authProviders: [
      {
        provider: {
          type: String,
          enum: ["google", "github", "linkedin"],
        },
        providerId: String, // ID from OAuth provider
        profilePictureURL: {
          type: String,
          validate: {
            validator: (v) => !v || validator.isURL(v),
            message: "Invalid profile picture URL.",
          },
        },
        
      },
    ],

    role: {
      type: String,
      enum: {
        values: ["student", "recruitor"],
        message: "{VALUE} is not a valid role.",
      },
      required: [true, "User role is required."],
    },

    profile: {
      bio: {
        type: String,
        trim: true,
        maxlength: [500, "Bio cannot exceed 500 characters."],
      },

      skills: {
        type: [String],
        validate: {
          validator: function (skills) {
            if (!skills || skills.length === 0) return true;
            if (skills.length > 30) return false;
            return skills.every(
              (s) =>
                typeof s === "string" &&
                s.trim().length >= 2 &&
                s.trim().length <= 50
            );
          },
          message:
            "Each skill must be 2–50 characters long, and total skills should not exceed 30.",
        },
      },

      resume: {
        resumeOriginalName: String,
        resumeURL: {
          type: String,
          validate: {
            validator: (v) => !v || validator.isURL(v),
            message: "Invalid resume URL.",
          },
        },
        resumePublicId: String,
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

      profilePicture: {
        profilePictureOriginalName: String,
        profilePictureURL: {
          type: String,
          validate: {
            validator: (v) => !v || validator.isURL(v),
            message: "Invalid profile picture URL.",
          },
        },
        profilePicturePublicId: String,
      },

      socials: {
        linkedIn: {
          type: String,
          validate: {
            validator: (v) => !v || validator.isURL(v),
            message: "Invalid LinkedIn URL.",
          },
        },
        github: {
          type: String,
          validate: {
            validator: (v) => !v || validator.isURL(v),
            message: "Invalid GitHub URL.",
          },
        },
        website: {
          type: String,
          validate: {
            validator: (v) => !v || validator.isURL(v),
            message: "Invalid website URL.",
          },
        },
      },
    },
  },
  { timestamps: true }
);

// 🔒 Password hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password") || this.isOAuthUser) return;
  this.password = await bcrypt.hash(this.password, 10);
});


// ✅ Password check
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 🧾 JWT generation
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      emailId: this.emailId,
      role: this.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
