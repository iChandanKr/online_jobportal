const CustomError = require("./customError");

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (error.name === "SequelizeValidationError") {
    error = new CustomError(`${error.errors[0].message}`, 400);
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    error = new CustomError(`${error.errors[0].message}`, 400);
  }

  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    // stackTrace: error.stack,
    error: error,
  });
};
