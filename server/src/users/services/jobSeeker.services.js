const {
  createJobseekerDb,
  findJobseekerDB,
  updateJobseekerDb,
  addEducationDB,
} = require("../repo/jobSeeker.repo");
const { generateAccessToken } = require("../../utils/tokenGenerator");
const { dataModel } = require("../../dbConnection");
const { CustomError } = require("../../utils/apiResponse");
const AuthService = require("../../auth/auth.services");
const { sequelize } = dataModel;
class JobseekerService {
  static createUserService = async (userData) => {
    const result = sequelize.transaction(async (t) => {
      const response = await createJobseekerDb(userData, t);
      delete response.dataValues.password;
      const userId = response.dataValues?.id;
      const refreshTokenDetails = await AuthService.createSessionService(
        userId,
        t
      );
      const accessToken = generateAccessToken(userId);
      response.dataValues.accessToken = accessToken;
      response.dataValues.refreshToken =
        refreshTokenDetails.dataValues?.refreshToken;
      return response;
    });
    return result;
  };

  static findJobseekerService = async (id) => {
    const user = await findJobseekerDB(id);
    if (!user) {
      console.log("inside user not found");
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
}

module.exports = JobseekerService;
