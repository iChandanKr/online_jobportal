const CustomError = require("../../utils/customError");
const AuthService = require("../auth.services");
const { generateAccessToken } = require("../../utils/tokenGenerator");
module.exports = async (sequelize, id, next) => {
  let result;
  let accessToken;

  try {
    result = await sequelize.transaction(async (t) => {
      const sessionDetails = await AuthService.createSessionService(id, t);
      return sessionDetails.dataValues;
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
  if (result) {
    accessToken = generateAccessToken(id);
  }
  return { refreshToken: result.refreshToken, accessToken };
};
