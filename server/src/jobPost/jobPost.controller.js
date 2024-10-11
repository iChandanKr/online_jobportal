const JobPostService = require("./jobPost.services");

const createJobPost = async (req, res) => {
  console.log("hello");

  const jobPostData = req.body;
  const empId=req.empId
  jobPostData.empId=empId
  try {
    const newJobData = await JobPostService.createJobPostService(jobPostData);
    return res.status(201).json({
      message: "Job Post created successfully!",
      data: newJobData,
    });
  } catch (error) {
    console.error("Error creating job post:", error,);
    return res.status(500).json({ error: error.message });
  }
};

const getJobsById=async(req,res)=>{
  try {
    const empId=req.params.empId
    const jobs=await JobPostService.getJobsByEmpId(empId) 
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

module.exports = {
  createJobPost,getJobsById
};
