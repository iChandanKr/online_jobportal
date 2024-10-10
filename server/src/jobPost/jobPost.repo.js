const { dataModel } = require("../dbConnection");
const { JobPost, JobSkills } = dataModel;
const createJobPostDb = async (jobPostData, t) => {

  const newJobData = await JobPost.create(
    {
      title: jobPostData.title,
      description: jobPostData.description,
      role: jobPostData.role,
      location: jobPostData.location,
      city: jobPostData.city,
      industryName: jobPostData.industryName,
      empId: jobPostData.empId,
      skillId: jobPostData.skillId,
      minSalary: jobPostData.minSalary,
      maxSalary: jobPostData.maxSalary,
      applicationDeadline: jobPostData.applicationDeadline,
      jobType: jobPostData.jobType,
      shift: jobPostData.shift,
    },
    { transaction: t }
  );

  if (jobPostData.skillId && jobPostData.skillId.length > 0) {
    
    const jobPostId = newJobData.id;

    const jobSkillsData = jobPostData.skillId.map((skillId) => ({
      JobPostId: jobPostId,
      SkillId: skillId,
    }));

    await JobSkills.bulkCreate(jobSkillsData, { transaction: t });
  }

  return newJobData;
};

module.exports = { createJobPostDb };
