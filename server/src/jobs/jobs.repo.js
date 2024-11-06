const { dataModel } = require("../dbConnection");
const { JobPost, JobSkills, Application, Skill, User, Employer } = dataModel;
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

const applicantOFaJob = async (id, orderBy) => {
  const sorting = orderBy.map((item) => {
    item.unshift(User);
    return item;
  });
  return JobPost.findByPk(id, {
    attributes: [],
    include: {
      model: User,
      attributes: {
        exclude: ["password", "passwordChangedAt", "createdAt", "updatedAt"],
      },
      through: {
        attributes: ["updatedAt", "status"],
      },
    },
    order: sorting, // to produce [ [ User, 'firstName', 'ASC' ], [ User, 'lastName', 'ASC' ] ]
  });
};
const getAllApplicantsDB = async (empId) => {
  return User.findAll({
    include: [
      {
        model: JobPost,
        attributes: ["title"], // Fetches job post titles for which the user has applied
        through: {
          attributes: [], // No additional fields are needed from the join table
        },
        include: [
          {
            model: Employer,
            where: { empId },
            attributes: [], // Exclude Employer attributes as only the empId filter is needed
          },
        ],
      },
    ],
    where: {
      "$JobPosts.Employer.empId$": empId,
    },
    distinct: true,
    attributes: {
      exclude: ["password", "passwordChangedAt", "createdAt", "updatedAt"],
    },
  });
};
const updateApplicationStatusDB = async (payloads) => {
  const updatedData = await Promise.all(
    payloads.map((payload) => {
      return Application.update(
        { status: payload.status },
        {
          where: {
            UserId: payload.userId,
            JobPostId: payload.jobId,
          },
          returning: true,
        }
      );
    })
  );
  return updatedData;
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
  applicantOFaJob,
  getAllApplicantsDB,
  updateApplicationStatusDB,
};
