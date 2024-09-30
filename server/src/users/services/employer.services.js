const { createEmployerDb } = require("../repo/employer.repo");
const { dataModel } = require("../../dbConnection");
const { sequelize } = dataModel;
const AuthService = require("../../auth/auth.services");
const CustomError = require("../../utils/customError");
const {generateAccessToken} = require('../../utils/tokenGenerator')
class EmployerService {
  static createEmployerService = async (employerData) => {
    let result;
    try {
      result = sequelize.transaction(async (t) => {
        const response = await createEmployerDb(employerData, t);
        delete response.dataValues.password;
        const userId = response.dataValues?.id;
        const refreshTokenDetails = await AuthService.createSessionService(
          userId,
          t
        );
       const accessToken = generateAccessToken(userId);
      response.dataValues.accessToken = accessToken;
        response.dataValues.refreshToken = refreshTokenDetails.dataValues?.refreshToken;
        return response;
      });
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
    return result;
  };
}
module.exports = EmployerService;
