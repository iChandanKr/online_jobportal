const {
  createJobseekerDb,
  findJobseekerDB,
} = require("../repo/jobSeeker.repo");
const{generateAccessToken} = require('../../utils/tokenGenerator');
const { dataModel } = require("../../dbConnection");
const CustomError = require("../../utils/customError");
const AuthService = require("../../auth/auth.services");
const { sequelize } = dataModel;
// const {generateAccessToken,generateRefreshToken} = require('../../utils/tokenGenerator');
class JobseekerService {
  static createUserService = async (userData) => {
    let result;
    try {
      result = sequelize.transaction(async (t) => {
        const response = await createJobseekerDb(userData, t);
        // console.log(response);
        
        delete response.dataValues.password;
        const userId = response.dataValues?.id;
        
        const refreshTokenDetails = await AuthService.createSessionService(userId,t);
        
        const accessToken = generateAccessToken(userId);
        response.dataValues.accessToken = accessToken;
        response.dataValues.refreshToken = refreshTokenDetails.dataValues?.refreshToken;
        return response;
      });
    } catch (error) {
      // console.log("aaa");
      
      throw new CustomError(error.message, 500);
    }
    return result;
  };

  static findJobseekerService = async (id) => {
    const res = await findJobseekerDB(id);
    // console.log(res);
    if (res) {
      return res;
    }
    throw new Error("user not found");
  };
}
module.exports = JobseekerService;
