const { createEmployerDb, updateEmployerDb } = require("../repo/employer.repo");
const { dataModel } = require("../../dbConnection");
const { sequelize } = dataModel;
const AuthService = require("../../auth/auth.services");
const { generateAccessToken } = require("../../utils/tokenGenerator");
class EmployerService {
  static createEmployerService = async (employerData) => {
    const result = sequelize.transaction(async (t) => {
      const response = await createEmployerDb(employerData, t);
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

  static updateEmployerService = async (id, employerData, t) => {
    return await updateEmployerDb(id, employerData, t);
  };
}
module.exports = EmployerService;
