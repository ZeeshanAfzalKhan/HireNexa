import express from "express";
import userAuth from "../middlewares/auth.js";
import {postJob, getJobs, getJobById, getAdminJobs, updateJob, deleteJob} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", userAuth, postJob);
router.get("/get", userAuth, getJobs);
router.get("/get-by-id/:id", userAuth, getJobById);
router.get("/get-admin-jobs", userAuth, getAdminJobs);
router.patch("/update/:id", userAuth, updateJob);
router.delete("/delete/:id", userAuth, deleteJob);

export default router;