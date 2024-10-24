const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const {
  createJobPostDb,
  getAllJobsDB,
  deleteJobDB,
  updateJobDB,
  applyForJobDB,
  getAllOpenJobsDB,
  getJobByIdDB,
  jobWithSkillDetails,
  jobsToApplyDB,
} = require("./jobs.repo");
const { sort, limitFields, search, paginate } = require("../utils/apiFeatures");

class JobService {
  static createJobPostService = async (jobpostdata) => {
    const result = await sequelize.transaction(async (t) => {
      return await createJobPostDb(jobpostdata, t);
    });
    return result;
  };

  static getAllJobsService = async (req) => {
    let orderBy;
    let visibleAttributes;
    let searchFields = req.query.search || "%";
    let shift = [];
    const limit = req.query.limit || 5;
    let offset;
    if (req.query.sort) {
      orderBy = sort(req.query.sort);
    } else {
      orderBy = sort("-updatedAt");
    }

    if (req.query.fields) {
      visibleAttributes = limitFields(req.query.fields);
    }

    if (req.query.search) {
      searchFields = search(searchFields);
    }
    if (!req.query.shift) {
      shift = ["morning", "evening"];
    } else {
      shift = [req.query.shift];
    }
    if (req.query.page) {
      offset = paginate(req.query.page, limit);
    }
    const attributes = visibleAttributes
      ? visibleAttributes
      : [
          "id",
          "title",
          "description",
          "role",
          "location",
          "city",
          "industryName",
          "skillId",
          "minSalary",
          "maxSalary",
          "applicationDeadline",
          "jobType",
          "shift",
          "companyName",
        ];
    const jobs = await getAllJobsDB(
      req.empId,
      orderBy,
      attributes,
      searchFields,
      shift,
      limit,
      offset
    );
    return jobs;
  };

  static updateJobService = async (id, updatedData) => {
    return await updateJobDB(id, updatedData);
  };

  static deleteJobService = async (id) => {
    return await deleteJobDB(id);
  };

  static applyJobService = async (userId, jobId) => {
    return await applyForJobDB(userId, jobId);
  };

  static getAllOpenJobService = async (req) => {
    let searchFields = req.query.search || "%";
    if (req.query.search) {
      searchFields = search(searchFields);
    }
    const jobDetails = await getAllOpenJobsDB(searchFields);

    return jobDetails;
  };

  static getJobByIdService = async (id) => {
    return await getJobByIdDB(id);
  };
  static getJobDetailsService = async (id) => {
    const jobDetails = await jobWithSkillDetails(id);
    const skills = jobDetails.Skills.map((skill) => skill.skillName);
    delete jobDetails.dataValues.skillId;
    delete jobDetails.dataValues.Skills;
    const jobWithSkill = { ...jobDetails.dataValues, skills };
    return jobWithSkill;
  };

  static jobsToApplyService = async (req) => {
    let searchFields = req.query.search || "%";
    if (req.query.search) {
      searchFields = search(searchFields);
    }
    return await jobsToApplyDB(req.user.id, searchFields);
  };
}
module.exports = JobService;
