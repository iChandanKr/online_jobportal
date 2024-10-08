const { loginSchema } = require("../utils/apiSchema");

module.exports = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: "Please enter a valid credentials",
      error,
    });
  } else {
    next();
  }
};
