const { respondOk } = require("../utils/apiResponse");
const JobPostService = require("./jobPost.services");

const createJobPost = async (req, res, next) => {
  const jobPostData = req.body;
  const empId = req.empId;
  jobPostData.empId = empId;
  try {
    const newJobData = await JobPostService.createJobPostService(jobPostData);
    respondOk(res, 201, "Job Post created successfully!", newJobData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPost,
};
