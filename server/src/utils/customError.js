class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      // this.message=message
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";
      this.isOperational = true;
      this.errorMessage=message
      Error.captureStackTrace(this, this.constructor);
    }
  }
    
  module.exports = CustomError;