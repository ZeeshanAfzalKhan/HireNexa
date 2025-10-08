import express from "express";
import {updateProfile, changePassword} from "../controllers/profile.controller.js";
import userAuth from "../middlewares/auth.js";

const router = express.Router();

router.patch("/update", userAuth, updateProfile);
router.patch("/changePassword", userAuth, changePassword);

export default router;