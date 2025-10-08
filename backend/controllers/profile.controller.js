import { User } from "../models/user.model.js";
import updateNestedFields from "../utils/updateNestedFields.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/fileUpload.js";
import validator from "validator";

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

    const iscurrentPasswordCorrect =
      await loggedInUser.isPasswordCorrect(currentPassword);

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
  } 
  catch (err) {
    res.status(500).json({
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

    const user = await User.findById(userId).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

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
        res.status(400).json({
            success: false,
            message: "Profile picture is required",
        });
    }
    const user = await User.findById(userId).select("-password");

    const response = await uploadToCloudinary(profilePicture);

    if(!response.url) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading profile picture",
        })
    }

    if(user.profile.profilePicture.profilePicturePublicId) {
        await deleteFromCloudinary(user.profile.profilePicture.profilePicturePublicId);
    }

    user.profile.profilePicture.profilePictureURL = response.url;
    user.profile.profilePicture.profilePicturePublicId = response.public_id;
    user.profile.profilePicture.profilePictureOriginalName = profilePicture.originalname;

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

    if(!user.profile.profilePicture.profilePicturePublicId) {
        res.status(400).json({
            success: false,
            message: "Profile picture not found",
        });
    }

    await deleteFromCloudinary(user.profile.profilePicture.profilePicturePublicId);

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

    if(!response.url) {
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading resume",
        })
    }

    if(user.profile.resume.resumePublicId) {
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

    if(!user.profile.resume.resumePublicId) {
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

