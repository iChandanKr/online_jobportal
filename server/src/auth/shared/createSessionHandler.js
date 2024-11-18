const { CustomError } = require("../../utils/apiResponse");
const AuthService = require("../auth.services");
const { generateAccessToken } = require("../../utils/tokenGenerator");
module.exports = async (id, next) => {
  let sessionDetails;
  let accessToken;

  try {
    sessionDetails = await AuthService.createSessionService(id);
    if (!sessionDetails) {
      throw new CustomError("Don't able to create session", 500);
    }
  } catch (error) {
    next(error);
  }
  if (sessionDetails) {
    accessToken = generateAccessToken(id);
  }
  return { refreshToken: sessionDetails, accessToken };
};
