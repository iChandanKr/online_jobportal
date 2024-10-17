const AuthService = require("./auth.services");
const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const createSessionHandler = require("./shared/createSessionHandler");
const { respondOk } = require("../utils/apiResponse");

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
        userLoginService.id,
        next
      );
      res.cookie("refreshToken", sendRes.refreshToken);
      res.cookie("accessToken", sendRes.accessToken);
      respondOk(res, 200, "You have been loggedin successfully!", {
        ...userLoginService,
        ...sendRes,
      });
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
      respondOk(res, 200, "You are loggedOut successfully!");
    }
  } catch (error) {
    next(error);
  }
};

// ------------ update password ---------
const updateUserPassword = async (req, res, next) => {
  
  try {
    const updatedPassword = await AuthService.updatePasswordService(req);
    if (updatedPassword) {
      respondOk(res, 200, "Password has been updated successfully!");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { userLogin, logoutUser,updateUserPassword };
