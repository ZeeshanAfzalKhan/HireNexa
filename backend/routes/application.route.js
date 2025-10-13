import express from "express";
import userAuth from "../middlewares/auth.js";
import {applyJob, getAppliedJobs,  updateStatus, getApplications} from "../controllers/application.controller.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router();

router.post("/apply/:jobId", userAuth, upload.single("resume"), applyJob);
router.get("/get", userAuth, getAppliedJobs);
router.get("/:jobId/applications", userAuth, getApplications);
router.post("/status/:applicationId/update", userAuth, updateStatus);

export default router;
