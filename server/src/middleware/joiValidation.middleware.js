const {
  loginSchema,
  registerJobSeekerSchema,
  registerEmployerSchema,
  logoutSchema,
  jobPostSchema,
  updateEmployerSchema,
  updateJobseekerSchema,
  updatePasswordSchema,
  addEducationSchema,
  addSkillSchema,
  applyJob,
} = require("../utils/apiSchema");
const { CustomError } = require("../utils/apiResponse");

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

const jobPostValidation = (req, res, next) => {
  const { error } = jobPostSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const updateEmployerValidation = (req, res, next) => {
  const { error } = updateEmployerSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const updateJobseekerValidation = (req, res, next) => {
  const { error } = updateJobseekerSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const updatePasswordValidation = (req, res, next) => {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const addEducationValidation = (req, res, next) => {
  const { error } = addEducationSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};
const addSkillValidation = (req, res, next) => {
  const { error } = addSkillSchema.validate(req.body);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

const applyJobValidation = (req, res, next) => {
  const { error } = applyJob.validate(req.body);
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
  jobPostValidation,
  updateEmployerValidation,
  updateJobseekerValidation,
  updatePasswordValidation,
  addEducationValidation,
  addSkillValidation,
  applyJobValidation,
};
