const AuthService = require("./auth.services");
const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const CustomError = require("../utils/customError");
const { generateAccessToken } = require("../utils/tokenGenerator");
const createSessionHandler = require("./shared/createSessionHandler");

// ---------- LOGIN-----------------
const userLogin = async (req, res, next) => {
  try {
    const userLoginService = await AuthService.loginService(
      req,
      req.body,
      next
    );
    if (!userLoginService) {
      throw new CustomError("something wrong", 500);
    } else {
      const sendRes = await createSessionHandler(
        sequelize,
        userLoginService.userId,
        next
      );
      res.cookie('refreshToken',sendRes.refreshToken);
      res.cookie('access-token',sendRes.accessToken)
      res.status(200).json({
        data: sendRes,
      });
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
    next(new CustomError(error.message, 500));
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

module.exports = { createSession, userLogin };
