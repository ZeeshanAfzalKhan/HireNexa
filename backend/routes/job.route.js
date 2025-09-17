import express from "express";
import userAuth from "../middlewares/auth.js";
import {postJob, getAllJobs, getJobById, getAdminJobs} from "../controllers/job.controller.js";

const jobRoute = express.Router();

jobRoute.route("/post").post(userAuth, postJob);
jobRoute.route("/get").get(userAuth, getAllJobs);
jobRoute.route("/getById/:id").get(userAuth, getJobById);
jobRoute.route("/getAdminJobs").get(userAuth, getAdminJobs);

export default jobRoute;