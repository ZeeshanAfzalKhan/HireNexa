import Job from "../models/job.model.js";
import validator from "validator";

export const postJob = async (req, res) => {
  try {
    const user = req.user;

    if(user.role != "recruitor") {
        res
            .status(400)
            .json({
                message: "Unauthorized access",
                success: false,
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

    const missingFields = requiredFields.filter((key) => !req.body[key]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Enter the fields: ${missingFields.join(", ")}`,
        success: false,
      });
    }

    if (!validator.isLength(title, { min: 5, max: 50 })) {
      return res.status(400).json({
        message: "Title should be between 5 and 50 characters.",
        success: false,
      });
    } else if (
      !validator.isLength(description, { min: 10, max: 5000 })
    ) {
      return res.status(400).json({
        message: "Description should be between 10 and 5000 characters.",
        success: false,
      });
    } else if (!Array.isArray(skillRequired)) {
      return res.status(400).json({
        message: "Requirements must be an array.",
        success: false,
      });
    } else if (
      req.body.skillRequired.length < 2 ||
      req.body.skillRequired.length > 20
    ) {
      return res.status(400).json({
        message: "Requirements should contain between 1 and 20 items.",
        success: false,
      });
    } else if (
      req.body.skillRequired.some(
        (item) =>
          typeof item !== "string" || item.length < 2 || item.length > 100
      )
    ) {
      return res.status(400).json({
        message:
          "Each requirement should be a string between 2 and 100 characters.",
        success: false,
      });
    } else if(!validator.isNumeric(salary.toString())){
      return res.status(400).json({
        message: "Salary must be a number.",
        success: false,
      });
    } else if(salary < 0){
      return res.status(400).json({
        message: "Salary must be a positive number.",
        success: false,
      });
    } else if(!validator.isNumeric(experience.toString())){
      return res.status(400).json({
        message: "Experience must be a number.",
        success: false,
      });
    } else if(!validator.isLength(location, { min: 10, max: 500 })){
      return res.status(400).json({
        message: "Location should be between 10 and 500 characters.",
        success: false,
      });
    } else if(!validator.isLength(jobType, { min: 2, max: 50 })){
      return res.status(400).json({
        message: "Job type should be between 2 and 50 characters.",
        success: false,
      });
    } else if(!validator.isNumeric(position.toString())){
      return res.status(400).json({
        message: "Position must be a number.",
        success: false,
      });
    } else if(position < 1){
      return res.status(400).json({
        message: "There must be at least 1 open position.",
        success: false,
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
            message: "Something went wrong while posting a job",
            success: false,
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
      message: "Something went wrong",
      success: false,
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
      message: "Something went wrong"
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
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
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const user = req.user;

    if(user.role !== "recruitor") {
        return res.status(401).json({
            message: "Unauthorized access",
            success: false,
        });
    }

    const jobs = await Job.find({ createdBy: user._id });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs fetched successfully.",
      jobs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
