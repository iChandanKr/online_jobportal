const jwt = require("jsonwebtoken");
const CustomError = require("./customError");
const generateAccessToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: process.env.ACCESSTOKENEXPIRESIN,
  });
  if (!accessToken) {
    throw new CustomError(500, "Error while generating access Token ");
  }
  return accessToken;
};

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPORESIN,
  });
  if (!refreshToken) {
    throw new CustomError(500, "Error while generating refresh Token ");
  }
  return refreshToken;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
