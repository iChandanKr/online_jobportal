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

module.exports = {
  createJobPost,
  getAllJobs,
  deleteJob,
  updateJobPost,
  applyJob,
  getJobById,
};
