import express from "express";
import userAuth from "../middlewares/auth.js";
import {registerCompany, getCompanyByUser, getCompanyById, updateCompany, deleteCompany} from "../controllers/company.controller.js";

const companyRoute = express.Router();

companyRoute.route("/register").post(userAuth, registerCompany);
companyRoute.route("/getByUser").get(userAuth, getCompanyByUser);
companyRoute.route("/getById/:id").get(userAuth, getCompanyById);
companyRoute.route("/update/:id").post(userAuth, updateCompany);
companyRoute.route("/delete/:id").post(userAuth, deleteCompany);

export default companyRoute;