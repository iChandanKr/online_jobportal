const jwt = require("jsonwebtoken");
const CustomError = require("./customError");
const generateAccessToken = (id) => {
  try {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
    });
    if (!accessToken) {
      throw new CustomError(500, "Error while generating access Token ");
    }
    return accessToken;
  } catch (error) {
    throw new CustomError(
      error.message ||
        "Unexpected error occurred while generating access token",
      500
    );
  }
};

const generateRefreshToken = (id) => {
  try {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
    });

    if (!refreshToken) {
      throw new CustomError(500, "Error while generating refresh Token ");
    }
    return refreshToken;
  } catch (error) {
    throw new CustomError(
      error.message ||
        "Unexpected error occurred while generating refresh token",
      500
    );
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
