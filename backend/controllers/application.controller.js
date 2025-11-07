import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { uploadToCloudinary } from "../utils/fileUpload.js";
import validator from "validator";

export const applyJob = async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.jobId;
    const { coverLetter } = req.body;
    let resumeFile = req.file;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        error: "Job ID is required",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        error: "You have already applied for this job",
      });
    }

    // Validate cover letter
    if (
      coverLetter &&
      !validator.isLength(coverLetter, { min: 20, max: 5000 })
    ) {
      return res.status(400).json({
        success: false,
        error: "Cover letter must be between 20 and 5000 characters",
      });
    }

    // Handle resume
    let resumeData = {};
    console.log(resumeFile);
    if (resumeFile) {
      if (!resumeFile.mimetype.startsWith("application/pdf")) {
        return res.status(400).json({
          success: false,
          error: "Resume must be a PDF file",
        });
      }

      const uploadResult = await uploadToCloudinary(resumeFile);

      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          error: "Error uploading resume",
        });
      }

      resumeData = {
        resumeOriginalName: resumeFile.originalname,
        resumeURL: uploadResult.url,
        resumePublicId: uploadResult.public_id,
      };
    } else if (user.profile?.resume?.resumePublicId) {
      // Use saved resume from profile if available
      resumeData = user.profile.resume;
    } else {
      return res.status(400).json({
        success: false,
        error: "Please upload a resume",
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: user._id,
      coverLetter,
      resume: resumeData,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("Error in applyJob:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { crreatedAt: -1 } },
        },
      })
      .skip(skip)
      .limit(limit);

    if (!applications) {
      return res.status(404).json({
        error: "No jobs found",
        success: false,
      });
    }

    const totalApplications = await Application.countDocuments({
      applicant: userId,
    });
    const totalPages = Math.ceil(totalApplications / limit);

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      currentPage: page,
      totalPages: totalPages,
      totalApplications: totalApplications,
      applications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.jobId;
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        error: "Unauthorized access",
        success: false,
      });
    }

    if (!user?.profile?.company?.equals(jobId?.company)) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
      });
    }

    if (!jobId) {
      return res.status(400).json({
        success: false,
        error: "Job ID is required",
      });
    }

    const filter = { job: jobId };
    if (status) filter.status = status;

    const totalApplications = await Application.countDocuments(filter);
    const totalPages = Math.ceil(totalApplications / limit);

    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("applicant");

    if (!applications) {
      return res.status(404).json({
        error: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      currentPage: page,
      totalPages: totalPages,
      totalApplications: totalApplications,
      applications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const user = req.user;
    const { status } = req.body;
    const applicationId = req.params.applicationId;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
      });
    }

    // Fetch application and populate job to access company
    const application = await Application.findById(applicationId).populate(
      "job"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        error: "Application not found",
      });
    }

    // Check if recruiter belongs to the same company as the job
    if (!user?.profile?.company?.equals(application.job.company)) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized access",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Status is required",
      });
    }

    if (application.status !== "pending") {
      return res.status(400).json({
        success: false,
        error: `Only pending applications can be updated. Current status: ${application.status}`,
      });
    }

    // Update status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
