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
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const { companyName, description } = req.body;
    if (!companyName || !description) {
      return res.status(404).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "All fields are required.",
        },
      });
    }

    if (!validator.isLength(companyName, { min: 3, max: 50 })) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_COMPANY_NAME",
          message:
            "Company Company name must be between 3 and 50 characters long.",
        },
      });
    }

    if (!validator.isLength(description, { min: 10, max: 200 })) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_DESCRIPTION",
          message:
            "Company description must be between 10 and 200 characters long.",
        },
      });
    }

    const doesCompanyExists = await Company.findOne({ name: companyName });
    if (doesCompanyExists) {
      return res.status(404).json({
        success: false,
        error: {
          code: "COMPANY_ALREADY_EXISTS",
          message: "Company already registered",
        },
      });
    }

    const createdCompany = await Company.create({
      name: companyName,
      description,
      userId: user._id,
    });

    if (!createdCompany) {
      return res.status(404).json({
        success: false,
        error: {
          code: "COMPANY_CREATION_FAILED",
          message: "Something went wrong while registering a company",
        },
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
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
};

export const getCompanyByUser = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const company = await Company.findOne({ userId: user._id });
    if (!company) {
      return res.status(404).json({
        success: false,
        error: {
          code: "COMPANY_NOT_FOUND",
          message: "Company not found",
        },
      });
    }

    return res.status(200).json({
      message: "Company found",
      company,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
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
        success: false,
        error: {
          code: "COMPANY_NOT_FOUND",
          message: "Company not found",
        },
      });
    }
    return res.status(200).json({
      message: "Company found",
      company,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
    console.log(err);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "recruitor") {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: {
          code: "NO_DATA_PROVIDED",
          message: "No data provided",
        },
      });
    }

    const { description, website, location } = req.body;
    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_COMPANY_ID",
          message: "Company id is required",
        },
      });
    }

    const companyToUpdate = await Company.findById(companyId);

    if (!companyToUpdate) {
      return res.status(404).json({
        success: false,
        error: {
          code: "COMPANY_NOT_FOUND",
          message: "Company not found",
        },
      });
    }

    if (companyToUpdate.userId.toString() !== user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
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
        success: false,
        error: {
          code: "COMPANY_UPDATE_FAILED",
          message: "Something went wrong while updating company data",
        },
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company: updatedCompany,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
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
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    if (!logo) {
      return res.status(400).json({
        success: false,
        error: {
          code: "NO_LOGO_PROVIDED",
          message: "No logo provided",
        },
      });
    }

    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_COMPANY_ID",
          message: "Company id is required",
        },
      });
    }

    const companyToUpdate = await Company.findById(companyId);

    if (!companyToUpdate) {
      return res.status(404).json({
        success: false,
        error: {
          code: "COMPANY_NOT_FOUND",
          message: "Company not found",
        },
      });
    }

    if (companyToUpdate.userId.toString() !== user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const response = await uploadToCloudinary(logo);

    if (!response.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "LOGO_UPLOAD_FAILED",
          message: "Something went wrong while uploading logo",
        },
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
        success: false,
        error: {
          code: "COMPANY_UPDATE_FAILED",
          message: "Something went wrong while updating company data",
        },
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company: updatedCompany,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
    console.log(err);
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "recruitor") {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_COMPANY_ID",
          message: "Company id is required",
        },
      });
    }

    const companyToDelete = await Company.findById(companyId);

    if (!companyToDelete) {
      return res.status(404).json({
        success: false,
        error: {
          code: "COMPANY_NOT_FOUND",
          message: "Company not found",
        },
      });
    }

    if (companyToDelete.userId.toString() !== user._id.toString()) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const deletedCompany = await Company.findByIdAndDelete(companyToDelete._id);

    if (!deletedCompany) {
      return res.status(400).json({
        success: false,
        error: {
          code: "COMPANY_DELETE_FAILED",
          message: "Something went wrong while deleting company data",
        },
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
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
    console.log(err);
  }
};
