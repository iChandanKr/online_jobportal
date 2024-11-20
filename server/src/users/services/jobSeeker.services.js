const {
  createJobseekerDb,
  findJobseekerDB,
  updateJobseekerDb,
  addEducationDB,
  addSkillsDb,
  getEducationDetailsDb,
  updateEducationDetailsDb,
  jobseekerDetailsDB,
  jobSeekerSkills,
  updateJobseekerSkillsDb,
  getAllApplicationsOfUser,
  getAllApplicationsDb,
} = require("../repo/jobSeeker.repo");
const { generateAccessToken } = require("../../utils/tokenGenerator");
const { dataModel } = require("../../dbConnection");
const { CustomError } = require("../../utils/apiResponse");
const AuthService = require("../../auth/auth.services");
const { sequelize } = dataModel;
const {
  sort,
  limitFields,
  paginate,
  search,
} = require("../../utils/apiFeatures");
class JobseekerService {
  static createUserService = async (userData) => {
    const result = sequelize.transaction(async (t) => {
      const response = await createJobseekerDb(userData, t);
      delete response.dataValues.password;
      const userId = response.dataValues?.id;
      const refreshTokenDetails = await AuthService.createSessionService(
        userId
      );
      const accessToken = generateAccessToken(userId);
      response.dataValues.accessToken = accessToken;
      response.dataValues.refreshToken = refreshTokenDetails;
      return response;
    });
    return result;
  };

  static findJobseekerService = async (id) => {
    const user = await findJobseekerDB(id);
    if (!user) {
      throw new CustomError("user not found", 404);
    }
    return user;
  };

  static updateJobseekerService = async (id, userData, t) => {
    return await updateJobseekerDb(id, userData, t);
  };

  static addEducationDetailsService = async (id, educationDetails) => {
    return await addEducationDB(id, educationDetails);
  };

  static addSkillsService = async (userId, skills) => {
    return await addSkillsDb(userId, skills);
  };

  static getEducationDetailsService = async (userId) => {
    return await getEducationDetailsDb(userId);
  };
  static getJobseekerDetailService = async (userId) => {
    const jobseekerDetails = await jobseekerDetailsDB(userId);
    const clonedObj = JSON.parse(JSON.stringify(jobseekerDetails));
    const education = clonedObj.Education_Details;
    const skills = clonedObj.Skills.map((skill) => skill.skillName);
    delete clonedObj.Education_Details;
    delete clonedObj.Skills;
    const profile = { ...clonedObj, ...education, skills };
    return profile;
  };

  static getJobseekerSkills = async (userId) => {
    const jobseekerSkills = await jobSeekerSkills(userId);
    const skills = jobseekerSkills.Skills.map((skill) => {
      return { id: skill.id, skillName: skill.skillName };
    });
    return skills;
  };

  static updateEducationDetailsService = async (userId, educationDetails) => {
    return await updateEducationDetailsDb(userId, educationDetails);
  };

  static updateJobseekerSkillsService = async (userId, skills) => {
    return await updateJobseekerSkillsDb(userId, skills);
  };

  static getAllApplicationsOfUserService = async (userId) => {
    return await getAllApplicationsOfUser(userId);
  };

  static getAllApplicationsService = async (req) => {
    let orderBy;
    let visibleAttributes;
    let searchFields = req.query.search || "%";
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

    if (req.query.page) {
      offset = paginate(req.query.page, limit);
    }

    const attributes = visibleAttributes
      ? visibleAttributes
      : [
          "id",
          "title",
          "role",
          "location",
          "city",
          "minSalary",
          "maxSalary",
          "applicationDeadline",
          "jobType",
          "companyName",
          "updatedAt",
        ];
    const jobs = await getAllApplicationsDb(
      req.user.id,
      orderBy,
      attributes,
      searchFields,
      limit,
      offset
    );
    // console.log(jobs);

    return jobs;
  };
}

module.exports = JobseekerService;
