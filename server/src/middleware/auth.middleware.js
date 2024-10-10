const jwt = require("jsonwebtoken");
const util = require("util");
const CustomError = require("../utils/customError");
const { dataModel } = require("../dbConnection");
const { User, sequelize } = dataModel;
const AuthService = require("../auth/auth.services");
const createSessionHandler = require("../auth/shared/createSessionHandler");

const recreateSession = async (req, res, next) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    return next(
      new CustomError("Access Denied, No refresh token provided.", 401)
    );
  }
  try {
    const verifyToken = util.promisify(jwt.verify); // it will return a asynchronous function
    const decodedToken = await verifyToken(
      incomingRefreshToken,
      process.env.REFRESH_SECRET_KEY
    );

    // if the user exists
    const user = await User.findByPk(decodedToken.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new CustomError("The user with the given token doesn't exist", 401);
    }

    // check the incoming refresh token exists in database;
    const existingRefreshToken = await AuthService.findRefreshTokenService(
      incomingRefreshToken
    );
    
    if (!existingRefreshToken) {
      throw new CustomError("Access Denied, Invalid Token", 401);
    }
    // create session again
    const sendRes = await createSessionHandler(
      sequelize,
      user.dataValues?.id,
      next
    );

    // delete the existing refresh token(session);
    AuthService.deleteRefreshTokenService(
      user.dataValues?.id,
      incomingRefreshToken
    );
    res.cookie("refreshToken", sendRes.refreshToken);
    res.cookie("accessToken", sendRes.accessToken);
    req.user = user.dataValues;
    req.currentRefreshToken = sendRes.refreshToken;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new CustomError(
          "Access Denied, Refresh token expired. Please login again",
          401
        )
      );
    } else {
      return next(error);
    }
  }
};

module.exports = async (req, res, next) => {
  //1. read the token if exists
  try {
    if (!req.cookies?.refreshToken || !req.cookies?.accessToken) {
      const error = new CustomError("you are not logged in!", 401);
      return next(error);
    }
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("you are not logged in!", 401);
      return next(error);
    }

    //2. validate token
    const verifyToken = util.promisify(jwt.verify); // it will return a asynchronous function
    const decodedToken = await verifyToken(
      token,
      process.env.ACCESS_SECRET_KEY
    );
    req.decodedToken=decodedToken

    //3. if the user exists
    const user = await User.findByPk(decodedToken.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      // ------ will do later for frontend =-----------------
      const error = new CustomError(
        "The user with the given token doesn't exist",
        401
      );
      return next(error);
    }

    //4. if the user changed the password after the token was issued
    const isPswdChanged = await user.isPasswordChanged(decodedToken.iat);
    if (isPswdChanged) {
      const error = new CustomError(
        "The password has been changed recently. Please login again",
        401
      );
      return next(error);
    }
    //5. allow user to access route
    req.user = user.dataValues;
    req.currentRefreshToken = req.cookies.refreshToken;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
    await  recreateSession(req, res, next);
    } else {
      next(new CustomError(error?.message || "Invalid Access Token", 401));
    }
  }
};
