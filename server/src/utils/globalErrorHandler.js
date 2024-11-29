/* eslint-disable no-unused-vars */
const { CustomError } = require("./apiResponse");
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (error.name === "SequelizeValidationError") {
    error = new CustomError(`${error.errors[0].message}`, 400);
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    error = new CustomError(`${error.errors[0].message}`, 400);
  }

  if (error instanceof CustomError) {
    let message = error.message;

    if (typeof message === "string") {
      try {
        message = JSON.parse(message);
      } catch (e) {
        message = error.message;
      }
    }
    error.message = message;
  }

  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    // stackTrace: error.stack,
    error: error,
  });
};
