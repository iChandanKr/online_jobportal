class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    // this.message=message
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";
    // this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}
const respondOk = (res, statusCode, message, resData = {}) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data: resData,
  });
};
module.exports = { CustomError, respondOk };
