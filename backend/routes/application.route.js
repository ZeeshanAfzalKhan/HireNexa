import express from "express";
import userAuth from "../middlewares/auth.js";
import {applyJob, getAppliedJobs, getApplicants, updateStatus} from "../controllers/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.route("/apply/:id").get(userAuth, applyJob);
applicationRouter.route("/get").get(userAuth, getAppliedJobs);
applicationRouter.route("/:id/applicants").get(userAuth, getApplicants);
applicationRouter.route("/status/:id/update").get(userAuth, updateStatus);

export default applicationRouter;
