const { CustomError } = require("../utils/apiResponse");
const getFirstNonEmpty = (req) => {
  const sources = [req.body, req.params, req.cookies];
  return (
    sources.find((source) => source && Object.keys(source).length > 0) || null
  );
};

const validateRequest = (schema) => (req, res, next) => {
  const bodyOrCookieOrParams = getFirstNonEmpty(req);
  const { error } = schema.validate(bodyOrCookieOrParams);
  if (error) {
    next(new CustomError(error.message, 400));
  } else {
    next();
  }
};

module.exports = {
  validateRequest,
};
