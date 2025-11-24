import express from "express";
import userAuth from "../middlewares/auth.js";
import {postJob, getJobs, getJobById, getAdminJobs, updateJob, toggleJobStatus} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", userAuth, postJob);
router.get("/get", getJobs);
router.get("/get-by-id/:id", getJobById);
router.get("/get-admin-jobs", userAuth, getAdminJobs);
router.patch("/update/:id", userAuth, updateJob);
router.patch("/toggle-status/:id", userAuth, toggleJobStatus);


export default router;