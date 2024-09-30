const jwt = require("jsonwebtoken");
const util = require("util");
const CustomError = require("../utils/customError");

module.exports = async (req, res, next) => {
  //1. read the token if exists
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    const error = new CustomError("you are not logged in!", 401);
    return next(error);
  }

  //2. validate token
  const verifyToken = util.promisify(jwt.verify); // it will return a asynchronous function
  const decodedToken = await verifyToken(token, process.env.ACCESS_SECRET_KEY);
  // console.log(decodedToken);

  //3. if the user exists
  const user = await User.findById(decodedToken.id);
  if (!user) {
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
  // console.log(user.id);
  req.user = user;

  next();
};
