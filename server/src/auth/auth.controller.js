const AuthService = require("./auth.services");
const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const CustomError = require("../utils/customError");
const { generateAccessToken } = require("../utils/tokenGenerator");
const createSessionHandler = require("./shared/createSessionHandler");
const resObj = require("../utils/response");

// ---------- LOGIN-----------------
const userLogin = async (req, res, next) => {
  try {
    const userLoginService = await AuthService.loginService(
      req,
      req.body,
      next
    );
    if (userLoginService) {
      const sendRes = await createSessionHandler(
        sequelize,
        userLoginService.userId,
        next
      );
      res.cookie("refreshToken", sendRes.refreshToken);
      res.cookie("accessToken", sendRes.accessToken);
      resObj(res, 200, "You have been loggedin successfully!", sendRes);
    }
  } catch (error) {
    next(error);
  }
};

// --------------LOGOUT-------------

const logoutUser = async (req, res, next) => {
  try {
    const logoutUserService = await AuthService.logoutService(req, res);
    if (logoutUserService >= 1) {
      resObj(res, 200, "You are loggedOut successfully!");
    }
  } catch (error) {
    next(error);
  }
};

// -- will do later if access token expires then create another session on request of frontend
const createSession = async (req, res, next) => {
  let result;
  let accessToken;
  const id = req.body.id;

  try {
    result = await sequelize.transaction(async (t) => {
      await AuthService.createSessionService(id, t);
    });
  } catch (error) {
    next(error);
  }
  if (result) {
    accessToken = generateAccessToken(id);
  }
  res.status(201).json({
    status: "success",
    token: result,
    access: accessToken,
  });
};

module.exports = { createSession, userLogin, logoutUser };
