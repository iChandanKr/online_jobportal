const { dataModel } = require("../dbConnection");
const { JobPost, JobSkills, Application, Skill } = dataModel;
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
      companyName: jobPostData.companyName,
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

const deleteJobDB = async (id) => {
  const jobPost = await JobPost.findByPk(id);
  await jobPost.destroy();
};

const updateJobDB = async (id, updatedData) => {
  const job = await JobPost.findByPk(id);
  return await job.update(updatedData);
};

const applyForJobDB = async (userId, jobId) => {
  return await Application.create({
    JobPostId: jobId,
    UserId: userId,
  });
};

const getJobByIdDB = async (id) => {
  return await JobPost.findByPk(id);
};

const getAllOpenJobsDB = async (searchFields) => {
  return await JobPost.findAll({
    where: {
      applicationDeadline: {
        [Op.gt]: Date.now(),
      },
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
        {
          city: {
            [Op.iLike]: searchFields,
          },
        },
        {
          companyName: {
            [Op.iLike]: searchFields,
          },
        },
      ],
    },
  });
};

const jobsToApplyDB = async (userId, searchFields) => {
  const appliedJobApplications = await Application.findAll({
    where: { UserId: userId },
    attributes: ["JobPostId"],
  });
  const appliedJobPostIds = appliedJobApplications.map((app) => app.JobPostId);
  return await JobPost.findAll({
    where: {
      id: {
        [Op.notIn]: appliedJobPostIds,
      },
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
        {
          city: {
            [Op.iLike]: searchFields,
          },
        },
        {
          companyName: {
            [Op.iLike]: searchFields,
          },
        },
      ],
    },
    attributes: {
      exclude: ["createdAt", "deletedAt", "updatedAt", "empId"],
    },
  });
};

const jobWithSkillDetails = async (id) => {
  return await JobPost.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["createdAt", "deletedAt", "updatedAt", "empId"],
    },
    include: [
      {
        model: Skill,
        attributes: ["skillName"],
      },
    ],
  });
};
module.exports = {
  createJobPostDb,
  getAllJobsDB,
  deleteJobDB,
  applyForJobDB,
  getAllOpenJobsDB,
  updateJobDB,
  getJobByIdDB,
  jobWithSkillDetails,
  jobsToApplyDB,
};
