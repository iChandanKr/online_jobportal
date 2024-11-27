const { respondOk } = require("../utils/apiResponse");
const JobService = require("./jobs.services");

const createJobPost = async (req, res, next) => {
  const jobPostData = req.body;
  const empId = req.empId;
  jobPostData.empId = empId;
  try {
    const newJobData = await JobService.createJobPostService(jobPostData);
    respondOk(res, 201, "Job Post created successfully!", newJobData);
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await JobService.getAllJobsService(req);
    respondOk(res, 200, "Here are the posted jobs", jobs);
  } catch (error) {
    next(error);
  }
};

const updateJobPost = async (req, res, next) => {
  const id = req.params.id;

  const updatedData = req.body;

  try {
    const updatedJobPost = await JobService.updateJobService(id, updatedData);
    if (updatedJobPost) {
      respondOk(res, 200, "Job post updated successfully!", updatedJobPost);
    }
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  const id = req.params.id;
  try {
    await JobService.deleteJobService(id);
    respondOk(res, 200, "Job post deleted successfully (soft delete)");
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const job = await JobService.getJobByIdService(id);
    respondOk(res, 200, "Job retrieved successfully!", job);
  } catch (error) {
    next(error);
  }
};

const applyJob = async (req, res, next) => {
  try {
    const jobId = req.body.jobId;
    const applyForJob = await JobService.applyJobService(req.user.id, jobId);
    if (applyForJob) {
      respondOk(
        res,
        201,
        "[You have Successfylly applied for job]",
        applyForJob
      );
    }
  } catch (error) {
    next(error);
  }
};

const getAllOpenJobs = async (req, res, next) => {
  try {
    const jobsOpening = await JobService.getAllOpenJobService(req);
    if (jobsOpening) {
      respondOk(
        res,
        200,
        "[Here are the jobs which might suits you!]",
        jobsOpening
      );
    }
  } catch (error) {
    next(error);
  }
};

const getJobDetails = async (req, res, next) => {
  try {
    const jobDetils = await JobService.getJobDetailsService(req.params.id);
    if (jobDetils) {
      respondOk(res, 200, "[Job with Skills required]", jobDetils);
    }
  } catch (error) {
    next(error);
  }
};

const jobsUserCanApply = async (req, res, next) => {
  try {
    const applicableJobs = await JobService.jobsToApplyService(req);
    if (applicableJobs) {
      respondOk(
        res,
        200,
        "[These are jobs you can apply for.]",
        applicableJobs
      );
    }
  } catch (error) {
    next(error);
  }
};

const applicantOfAJob = async (req, res, next) => {
  try {
    const applicants = await JobService.applicantOfAjobService(req);
    if (applicants) {
      respondOk(res, 200, "All applicants of this jobs.", applicants);
    }
  } catch (error) {
    next(error);
  }
};

const getAllApplicants = async (req, res, next) => {
  try {
    const applicants = await JobService.getAllapplicantService(req);
    if (applicants) {
      respondOk(res, 200, "All applicants of this jobs.", applicants);
    }
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const updatedApplication = await JobService.updateApplicationStatusService(
      req.body.payload
    );

    if (updatedApplication) {
      respondOk(
        res,
        200,
        "Application status updated successfully!"
        // updatedApplication
      );
    }
  } catch (error) {
    next(error);
  }
};

const getOpenJobsOfEmployer = async (req, res, next) => {
  try {
    const openJobs = await JobService.getOpenJobsOfEmployerService(req.empId);

    if (openJobs) {
      respondOk(res, 200, "All open jobs", openJobs.count);
    }
  } catch (error) {
    next(error);
  }
};

const getClosedJobsOfEmployer = async (req, res, next) => {
  try {
    const openJobs = await JobService.getClosedJobsOfEmployerService(req.empId);

    if (openJobs) {
      respondOk(res, 200, "All closed jobs", openJobs.count);
    }
  } catch (error) {
    next(error);
  }
};

const getPostedJobPermonthOfEmployer = async (req, res, next) => {
  try {
    const jobsPerMonth = await JobService.getJobPostPerMonthOfEmployerService(
      req.empId
    );
    if (jobsPerMonth) {
      respondOk(res, 200, "Job created per month", jobsPerMonth);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const bulkCreateJobs = async (req, res, next) => {
  const bulkData = await JobService.bulkCreateJobService(req, res, next);
  if (bulkData?.success) {
    respondOk(res, 200, "file uploaded and parsed successfully", bulkData);
  } else {
    res.status(400).json({
      status: "fail",
      message: bulkData?.errorsOccured,
    });
  }
};
module.exports = {
  createJobPost,
  getAllJobs,
  deleteJob,
  updateJobPost,
  applyJob,
  getAllOpenJobs,
  getJobById,
  getJobDetails,
  jobsUserCanApply,
  applicantOfAJob,
  getAllApplicants,
  updateApplicationStatus,
  getOpenJobsOfEmployer,
  getClosedJobsOfEmployer,
  getPostedJobPermonthOfEmployer,
  bulkCreateJobs,
};
