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
        message: "User not found",
        success: false,
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
      .json({ success: false, message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const userId = req.user._id;

    const loggedInUser = await User.findById(userId);

    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const iscurrentPasswordCorrect = await loggedInUser.isPasswordCorrect(
      currentPassword
    );

    if (!iscurrentPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        message: "Enter a Strong Password",
        success: false,
      });
    }

    loggedInUser.password = newPassword;

    await loggedInUser.save();

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
    console.log(err);
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
        message:
          "You are not allowed to update email, password, or file URLs directly",
      });
    } else if (
      updates.firstName &&
      !validator.isLength(updates.firstName, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        success: false,
        message: "First name must be between 3 and 20 characters",
      });
    } else if (
      updates.lastName &&
      !validator.isLength(updates.lastName, { min: 3, max: 20 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Last name must be between 3 and 20 characters",
      });
    } else if (
      updates.profile.bio &&
      !validator.isLength(updates.profile.bio, { min: 20, max: 200 })
    ) {
      return res.status(400).json({
        success: false,
        message: "Bio must be between 0 and 200 characters",
      });
    } else if (
      updates.phoneNumber &&
      !validator.isMobilePhone(updates.phoneNumber, "en-IN")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact number",
      });
    } else if (updates.profile.skills) {
      const skills = updates.profile.skills;
      console.log(skills);
      if (!Array.isArray(skills)) {
        return res.status(400).json({
          message: "Skills must be an array.",
          success: false,
        });
      }

      if (skills.length > 15) {
        return res.status(400).json({
          message: "You can specify a maximum of 15 skills.",
          success: false,
        });
      }

      for (const skill of skills) {
        if (
          typeof skill !== "string" ||
          !validator.isLength(skill.trim(), { min: 3, max: 30 })
        ) {
          return res.status(400).json({
            message: "Each skill must be between 3 and 30 characters long.",
            success: false,
          });
        }
      }
    }

    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

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
      .json({ success: false, message: "Something went wrong" });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    const profilePicture = req.file;

    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
    }
    const user = await User.findById(userId).select("-password");

    const response = await uploadToCloudinary(profilePicture);

    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong while uploading profile picture",
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
      .json({ success: false, message: "Something went wrong" });
  }
};

export const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user?.profile?.profilePicture?.profilePicturePublicId?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Profile picture not found",
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
      .json({ success: false, message: "Something went wrong" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const resume = req.file;

    if (!resume) {
      res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }
    const user = await User.findById(userId).select("-password");

    const response = await uploadToCloudinary(resume);

    if (!response.success) {
      res.status(400).json({
        success: false,
        message: "Something went wrong while uploading resume",
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
      .json({ success: false, message: "Something went wrong" });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user.profile.resume.resumePublicId) {
      res.status(400).json({
        success: false,
        message: "Resume not found",
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
      .json({ success: false, message: "Something went wrong" });
  }
};
