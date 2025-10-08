import express from "express";
import userAuth from "../middlewares/auth.js";
import {registerCompany, getCompanyByUser, getCompanyById, updateCompany, deleteCompany} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/register", userAuth, registerCompany);
router.get("/getByUser", userAuth, getCompanyByUser);
router.get("/getById/:id", userAuth, getCompanyById);
router.post("/update/:id", userAuth, updateCompany);
router.post("/delete/:id", userAuth, deleteCompany);

export default router;