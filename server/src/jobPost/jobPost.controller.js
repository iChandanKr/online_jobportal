const JobPostService = require("./jobPost.services");

const createJobPost = async (req, res, next) => {
  const jobPostData = req.body;
  const empId = req.empId;
  jobPostData.empId = empId;
  try {
    const newJobData = await JobPostService.createJobPostService(jobPostData);
    return res.status(201).json({
      message: "Job Post created successfully!",
      data: newJobData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobPost,
};
