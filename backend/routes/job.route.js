import express from "express";
import userAuth from "../middlewares/auth.js";
import {postJob, getJobs, getJobById, getAdminJobs} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", userAuth, postJob);
router.get("/get", userAuth, getJobs);
router.get("/get-by-id/:id", userAuth, getJobById);
router.get("/get-admin-jobs", userAuth, getAdminJobs);


export default router;