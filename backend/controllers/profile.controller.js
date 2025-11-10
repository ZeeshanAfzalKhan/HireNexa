import User from "../models/user.model.js";
import updateNestedFields from "../utils/updateNestedFields.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/fileUpload.js";
import validator from "validator";
import containsRestrictedField from "../utils/containsRestrictedFields.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "All fields are required",
        },
      });
    }

    const userId = req.user._id;

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });
    }

    const iscurrentPasswordCorrect = await loggedInUser.isPasswordCorrect(
      currentPassword
    );

    if (!iscurrentPasswordCorrect) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INCORRECT_PASSWORD",
          message: "Incorrect password",
        },
      });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Enter a Strong Password",
        },
      });
    }

    loggedInUser.password = newPassword;

    await loggedInUser.save();

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const restrictedFields = [
      "emailId",
      "password",
      "role",
      "profilePicture",
      "resume",
    ];

    if (containsRestrictedField(req.body, restrictedFields)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "RESTRICTED_FIELDS",
          message: "You are not allowed to update email, password, or file URLs directly",
        },
      });
    } else if (
      updates.firstName &&
      !validator.isLength(updates.firstName, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_FIRST_NAME",
          message: "First name must be between 3 and 20 characters",
        },
      });
    } else if (
      updates.lastName &&
      !validator.isLength(updates.lastName, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_LAST_NAME",
          message: "Last name must be between 3 and 20 characters",
        },
      });
    } else if (
      updates.profile.bio &&
      !validator.isLength(updates.profile.bio, { min: 20, max: 200 })
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_BIO",
          message: "Bio must be between 0 and 200 characters",
        },
      });
    } else if (
      updates.phoneNumber &&
      !validator.isMobilePhone(updates.phoneNumber, "en-IN")
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_PHONE_NUMBER",
          message: "Invalid contact number",
        },
      });
    } else if (updates.profile.skills) {
      const skills = updates.profile.skills;
      console.log(skills);
      if (!Array.isArray(skills)) {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_SKILLS_FORMAT",
            message: "Skills must be an array.",
          },
        });
      }

      if (skills.length > 15) {
        return res.status(400).json({
          success: false,
          error: {
            code: "TOO_MANY_SKILLS",
            message: "You can specify a maximum of 15 skills.",
          },
        });
      }

      for (const skill of skills) {
        if (
          typeof skill !== "string" ||
          !validator.isLength(skill.trim(), { min: 3, max: 30 })
        ) {
          return res.status(400).json({
            success: false,
            error: {
              code: "INVALID_SKILL_LENGTH",
              message: "Each skill must be between 3 and 30 characters long.",
            },
          });
        }
      }
    }

    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, error: "User not found" });

    updateNestedFields(user, updates);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    const profilePicture = req.file;

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_PROFILE_PICTURE",
          message: "Profile picture is required",
        },
      });
    }
    const user = await User.findById(userId).select("-password");

    const response = await uploadToCloudinary(profilePicture);

    if (!response.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "PROFILE_PICTURE_UPLOAD_FAILED",
          message: "Something went wrong while uploading profile picture",
        },
      });
    }

    if (user.profile.profilePicture.profilePicturePublicId) {
      await deleteFromCloudinary(
        user.profile.profilePicture.profilePicturePublicId
      );
    }

    user.profile.profilePicture.profilePictureURL = response.url;
    user.profile.profilePicture.profilePicturePublicId = response.public_id;
    user.profile.profilePicture.profilePictureOriginalName =
      profilePicture.originalname;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
  }
};

export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
        },
      });
    }

    if (!user?.profile?.profilePicture?.profilePicturePublicId?.trim()) {
      return res.status(400).json({
        success: false,
        error: {
          code: "PROFILE_PICTURE_NOT_FOUND",
          message: "Profile picture not found",
        },
      });
    }

    await deleteFromCloudinary(
      user.profile.profilePicture.profilePicturePublicId
    );

    user.profile.profilePicture.profilePictureURL = "";
    user.profile.profilePicture.profilePicturePublicId = "";
    user.profile.profilePicture.profilePictureOriginalName = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_RESUME",
          message: "Resume is required",
        },
      });
    }
    const user = await User.findById(userId).select("-password");

    const response = await uploadToCloudinary(resume);

    if (!response.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "RESUME_UPLOAD_FAILED",
          message: "Something went wrong while uploading resume",
        },
      });
    }

    if (user.profile.resume.resumePublicId) {
      await deleteFromCloudinary(user.profile.resume.resumePublicId);
    }

    user.profile.resume.resumeURL = response.url;
    user.profile.resume.resumePublicId = response.public_id;
    user.profile.resume.resumeOriginalName = resume.originalname;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user.profile.resume.resumePublicId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "RESUME_NOT_FOUND",
          message: "Resume not found",
        },
      });
    }

    await deleteFromCloudinary(user.profile.resume.resumePublicId);

    user.profile.resume.resumeURL = "";
    user.profile.resume.resumePublicId = "";
    user.profile.resume.resumeOriginalName = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
  }
};
