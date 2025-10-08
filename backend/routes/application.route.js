import express from "express";
import userAuth from "../middlewares/auth.js";
import {applyJob, getAppliedJobs, getApplicants, updateStatus} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply/:id", userAuth, applyJob);
router.get("/get", userAuth, getAppliedJobs);
router.get("/:id/applicants", userAuth, getApplicants);
router.post("/status/:id/update", userAuth, updateStatus);

export default router;
