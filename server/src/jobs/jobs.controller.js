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
module.exports = {
  createJobPost,
  getAllJobs,
};
