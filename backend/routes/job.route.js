import express from "express";
import userAuth from "../middlewares/auth.js";
import {postJob, getAllJobs, getJobById, getAdminJobs} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", userAuth, postJob);
router.get("/get", userAuth, getAllJobs);
router.get("/getById/:id", userAuth, getJobById);
router.get("/getAdminJobs", userAuth, getAdminJobs);



export default router;