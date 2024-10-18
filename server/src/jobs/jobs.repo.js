const { dataModel } = require("../dbConnection");
const { JobPost, JobSkills } = dataModel;
const { Op } = require("sequelize");
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

  const jobPostId = newJobData.id;

  const jobSkillsData = jobPostData.skillId.map((skillId) => ({
    JobPostId: jobPostId,
    SkillId: skillId,
  }));

  await JobSkills.bulkCreate(jobSkillsData, { transaction: t });

  return newJobData;
};

const getAllJobsDB = async (
  id,
  orderBy,
  attributes,
  searchFields,
  shift,
  limit,
  offset
) => {
  return JobPost.findAndCountAll({
    where: {
      empId: id,
      [Op.or]: [
        {
          title: {
            [Op.iLike]: searchFields,
          },
        },
        {
          role: {
            [Op.iLike]: searchFields,
          },
        },
      ],
      shift: {
        [Op.in]: shift,
      },
    },
    order: orderBy,
    attributes,
    limit,
    offset,
  });
};

const deleteJobDB=async(id)=>{
  const jobPost=await JobPost.findByPk(id)
  await jobPost.destroy()
}

module.exports = { createJobPostDb, getAllJobsDB,deleteJobDB };
