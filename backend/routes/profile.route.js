import express from "express";
import {changePassword, deleteProfilePicture, deleteResume, getProfile, updateProfile, updateProfilePicture, updateResume} from "../controllers/profile.controller.js";
import userAuth from "../middlewares/auth.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router();


router.get("/", userAuth, getProfile); 

router.patch("/change-password", userAuth, changePassword);

router.patch("/update", userAuth, updateProfile);

router.patch("/profile-picture/update", userAuth, upload.single("profilePicture"), updateProfilePicture);

router.patch("/profile-picture/delete", userAuth, deleteProfilePicture);

router.patch("/resume/update", userAuth, upload.single("resume"), updateResume);

router.patch("/resume/delete", userAuth, deleteResume);

export default router;