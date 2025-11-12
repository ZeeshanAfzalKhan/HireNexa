import Job from "../models/job.model.js";
import validator from "validator";

export const postJob = async (req, res) => {
  try {
    const user = req.user;

    if(user.role != "recruitor") {
        return res
            .status(400)
            .json({
                success: false,
                error: {
                  code: "UNAUTHORIZED_ACCESS",
                  message: "Unauthorized access",
                },
            });
    }

    const companyId = user.profile?.company;


    const {
      title,
      description,
      skillRequired,
      salary,
      experience,
      location,
      jobType,
      position,
    } = req.body;

    const requiredFields = [
      "title",
      "description",
      "skillRequired",
      "salary",
      "experience",
      "location",
      "jobType",
      "position",
    ];

    const missingFields = requiredFields.filter((key) => {
      const value = req.body[key];
      return value === undefined || value === null || value === "" || 
             (Array.isArray(value) && value.length === 0);
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: `Enter the fields: ${missingFields.join(", ")}`,
        },
      });
    }

    if (!validator.isLength(title, { min: 5, max: 50 })) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_TITLE",
          message: "Title should be between 5 and 50 characters.",
        },
      });
    } else if (
      !validator.isLength(description, { min: 10, max: 5000 })
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_DESCRIPTION",
          message: "Description should be between 10 and 5000 characters.",
        },
      });
    } else if (!Array.isArray(skillRequired)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_SKILLS_FORMAT",
          message: "Requirements must be an array.",
        },
      });
    } else if (
      req.body.skillRequired.length < 1 ||
      req.body.skillRequired.length > 20
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_SKILLS_COUNT",
          message: "Requirements should contain between 1 and 20 items.",
        },
      });
    } else if (
      req.body.skillRequired.some(
        (item) =>
          typeof item !== "string" || item.length < 2 || item.length > 100
      )
    ) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_SKILL_LENGTH",
          message: "Each requirement should be a string between 2 and 100 characters.",
        },
      });
    } else if(!validator.isNumeric(salary.toString())){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_SALARY_FORMAT",
          message: "Salary must be a number.",
        },
      });
    } else if(salary < 0){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_SALARY_VALUE",
          message: "Salary must be a positive number.",
        },
      });
    } else if(!validator.isNumeric(experience.toString())){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EXPERIENCE_FORMAT",
          message: "Experience must be a number.",
        },
      });
    } else if(experience < 0 || experience > 50){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_EXPERIENCE_VALUE",
          message: "Experience must be between 0 and 50 years.",
        },
      });
    } else if(!validator.isLength(location, { min: 10, max: 500 })){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_LOCATION",
          message: "Location should be between 10 and 500 characters.",
        },
      });
    } else if(!validator.isLength(jobType, { min: 2, max: 50 })){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_JOB_TYPE",
          message: "Job type should be between 2 and 50 characters.",
        },
      });
    } else if(!validator.isNumeric(position.toString())){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_POSITION_FORMAT",
          message: "Position must be a number.",
        },
      });
    } else if(position < 1){
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_POSITION_VALUE",
          message: "There must be at least 1 open position.",
        },
      });
    }

    const createdJob = await Job.create({
      title,
      description,
      skillRequired,
      salary: Number(salary), 
      location,
      jobType,
      experience,
      position,
      company: companyId,
      createdBy: user._id,
    });

    if(!createdJob) {
        return res.status(500).json({
            success: false,
            error: {
              code: "JOB_CREATION_FAILED",
              message: "Something went wrong while posting a job",
            },
        });
    }

    return res.status(201).json({
      message: "Job posted successfully.",
      job: createdJob,
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

export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const location = req.query.location || "";
    const jobType = req.query.jobType || "";
    const skills = req.query.skills ? req.query.skills.split(",") : []; // comma-separated
    const sortBy = req.query.sortBy || "createdAt"; // "salary", "experience", "createdAt"
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    // Range filters
    const minSalary = req.query.minSalary ? parseInt(req.query.minSalary) : 0;
    const maxSalary = req.query.maxSalary ? parseInt(req.query.maxSalary) : Number.MAX_SAFE_INTEGER;
    const minExperience = req.query.minExperience ? parseInt(req.query.minExperience) : 0;
    const maxExperience = req.query.maxExperience ? parseInt(req.query.maxExperience) : Number.MAX_SAFE_INTEGER;

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build dynamic query
    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } }
          ]
        },
        location ? { location: { $regex: location, $options: "i" } } : {},
        jobType ? { jobType } : {},
        skills.length ? { skillRequired: { $in: skills } } : {},
        { salary: { $gte: minSalary, $lte: maxSalary } },
        { experience: { $gte: minExperience, $lte: maxExperience } }
      ]
    };

    // Remove empty objects from $and
    query.$and = query.$and.filter(cond => Object.keys(cond).length > 0);

    // Fetch jobs
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
    
    // Total jobs count
    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / limit);

    return res.status(200).json({
      message: "Jobs fetched successfully.",
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalJobs: totalJobs,
      jobs
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

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        error: {
          code: "JOB_NOT_FOUND",
          message: "Job not found.",
        },
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully.",
      job,
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

export const getAdminJobs = async (req, res) => {
  try {
    const user = req.user;

    if(user.role !== "recruitor") {
        return res.status(401).json({
            success: false,
            error: {
              code: "UNAUTHORIZED_ACCESS",
              message: "Unauthorized access",
            },
        });
    }

    const jobs = await Job.find({ createdBy: user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: jobs.length > 0 ? "Jobs fetched successfully." : "No jobs found.",
      jobs,
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

export const updateJob = async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.id;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: {
          code: "JOB_NOT_FOUND",
          message: "Job not found",
        },
      });
    }

    if (!job.createdBy.equals(user._id)) {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You can only update jobs you created",
        },
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
      runValidators: true,
    }).populate("company");

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
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

export const deleteJob = async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.id;

    if (user.role !== "recruitor") {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: {
          code: "JOB_NOT_FOUND",
          message: "Job not found",
        },
      });
    }

    if (!job.createdBy.equals(user._id)) {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You can only delete jobs you created",
        },
      });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
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
