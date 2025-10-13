import express from "express";
import userAuth from "../middlewares/auth.js";
import {registerCompany, getCompanyByUser, getCompanyById, updateCompany, deleteCompany, updateCompanyLogo} from "../controllers/company.controller.js";
import { upload } from "../utils/fileUpload.js";

const router = express.Router();

router.post("/register", userAuth, registerCompany);
router.get("/getByUser", userAuth, getCompanyByUser);
router.get("/get-by-id/:id", userAuth, getCompanyById);
router.patch("/update/:id", userAuth, updateCompany);
router.patch("/logo/update/:id", userAuth, upload.single("logo"), updateCompanyLogo);
router.post("/delete/:id", userAuth, deleteCompany);

export default router;