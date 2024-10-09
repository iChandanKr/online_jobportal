const {
  loginSchema,
  registerJobSeekerSchema,
  registerEmployerSchema,
  logoutSchema,
} = require("../utils/apiSchema");
const CustomError = require("../utils/customError");

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const logoutValidator = (req, res, next) => {
  const { error } = logoutSchema.validate(req.cookies);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const registerJobseekerValidation = (req, res, next) => {
  const { error } = registerJobSeekerSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const registerEmployerValidation = (req, res, next) => {
  const { error } = registerEmployerSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};
module.exports = {
  loginValidation,
  logoutValidator,
  registerJobseekerValidation,
  registerEmployerValidation,
};
