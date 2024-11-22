const { CustomError } = require("../utils/apiResponse");

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body || req.params || req.cookies);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

module.exports = {
  validateRequest,
};
