const { CustomError } = require("../../utils/apiResponse");
const AuthService = require("../auth.services");
const { generateAccessToken } = require("../../utils/tokenGenerator");
module.exports = async (sequelize, id, next) => {
  let result;
  let accessToken;

  try {
    result = await sequelize.transaction(async (t) => {
      const sessionDetails = await AuthService.createSessionService(id, t);
      if (!sessionDetails) {
        throw new CustomError("Don't able to create session", 500);
      }
      return sessionDetails.dataValues;
    });
  } catch (error) {
    next(error);
  }
  if (result) {
    accessToken = generateAccessToken(id);
  }
  return { refreshToken: result.refreshToken, accessToken };
};
