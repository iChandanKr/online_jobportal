const express = require("express");
const { registerEmployer } = require("../controller/employer.controller");
const {
  registerEmployerValidation,
} = require("../../middleware/joiValidation.middleware");
const router = express.Router();
router
  .route("/register-employer")
  .post(registerEmployerValidation, registerEmployer);

module.exports = router;
