import Company from "../models/company.model.js";
import validator from "validator";
import User from "../models/user.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/fileUpload.js";

export const registerCompany = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    const { companyName, description } = req.body;
    if (!companyName || !description) {
      return res.status(404).json({
        error: "All fields are required.",
        success: false,
      });
    }

    if (!validator.isLength(companyName, { min: 3, max: 50 })) {
      return res.status(400).json({
        error:
          "Company Company name must be between 3 and 50 characters long.",
        success: false,
      });
    }

    if (!validator.isLength(description, { min: 10, max: 200 })) {
      return res.status(400).json({
        error:
          "Company description must be between 10 and 200 characters long.",
        success: false,
      });
    }

    const doesCompanyExists = await Company.findOne({ name: companyName });
    if (doesCompanyExists) {
      return res.status(404).json({
        error: "Company already registered",
        success: false,
      });
    }

    const createdCompany = await Company.create({
      name: companyName,
      description,
      userId: user._id,
    });

    if (!createdCompany) {
      return res.status(404).json({
        error: "Something went wrong while registering a company",
        success: false,
      });
    }

    user.profile.company = createdCompany._id;
    await user.save();

    return res.status(201).json({
      message: "Company registered successfully",
      company: createdCompany,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
  }
};

export const getCompanyByUser = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    const company = await Company.findOne({ userId: user._id });
    if (!company) {
      return res.status(404).json({
        error: "Company not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Company found",
      company,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
    console.log(err);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        error: "Company not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Company found",
      company,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
    console.log(err);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "recruitor") {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    if (!req.body) {
      return res.status(400).json({
        error: "No data provided",
        success: false,
      });
    }

    const { description, website, location } = req.body;
    const companyId = req.params.id;

    if (!companyId) {
      res.status(400).json({
        error: "Company id is required",
        success: false,
      });
    }

    const companyToUpdate = await Company.findById(companyId);

    if (!companyToUpdate) {
      return res.status(404).json({
        error: "Company not found",
        status: false,
      });
    }

    if (companyToUpdate.userId.toString() !== user._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        description,
        website,
        location,
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(400).json({
        error: "Something went wrong while updating company data",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company: updatedCompany,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
    console.log(err);
  }
};

export const updateCompanyLogo = async (req, res) => {
  try {
    const user = req.user;
    const logo = req.file;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    if (!logo) {
      return res.status(400).json({
        error: "No logo provided",
        success: false,
      });
    }

    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        error: "Company id is required",
        success: false,
      });
    }

    const companyToUpdate = await Company.findById(companyId);

    if (!companyToUpdate) {
      return res.status(404).json({
        error: "Company not found",
        status: false,
      });
    }

    if (companyToUpdate.userId.toString() !== user._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    const response = await uploadToCloudinary(logo);

    if (!response.success) {
      return res.status(400).json({
        error: "Something went wrong while uploading logo",
        success: false,
      });
    }

    if (companyToUpdate.logo?.logoPublicId) {
      await deleteFromCloudinary(companyToUpdate.logo.logoPublicId);
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        logo: {
          logoOriginalName: logo.originalname,
          logoURL: response.url,
          logoPublicId: response.public_id,
        },
      },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(400).json({
        error: "Something went wrong while updating company data",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company: updatedCompany,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
    console.log(err);
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "recruitor") {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    const companyId = req.params.id;

    if (!companyId) {
      res.status(400).json({
        error: "Company id is required",
        success: false,
      });
    }

    const companyToDelete = await Company.findById(companyId);

    if (!companyToDelete) {
      return res.status(404).json({
        error: "Company not found",
        status: false,
      });
    }

    if (companyToDelete.userId.toString() !== user._id.toString()) {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    const deletedCompany = await Company.findByIdAndDelete(companyToDelete._id);

    if (!deletedCompany) {
      res.status(400).json({
        error: "Something went wrong while deleting company data",
        success: false,
      });
    }

    if (deletedCompany.logo?.logoPublicId) {
      await deleteFromCloudinary(deletedCompany.logo.logoPublicId);
    }

    return res.status(200).json({
      message: "Company has been deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      success: false,
    });
    console.log(err);
  }
};
