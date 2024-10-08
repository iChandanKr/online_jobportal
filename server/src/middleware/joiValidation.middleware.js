const { loginSchema, registerUserSchema } = require("../utils/apiSchema");
const CustomError = require("../utils/customError");

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const registerUserValidation = (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};
module.exports = {
  loginValidation,
  registerUserValidation,
};
