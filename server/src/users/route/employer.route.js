const express = require("express");
const {
  registerEmployer,
  updateEmployer,
  getSpecificEmployeer,
} = require("../controller/employer.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const {
  registerEmployerValidation,
  updateEmployerValidation,
} = require("../../middleware/joiValidation.middleware");
const checkEmployerRole = require("../../middleware/checkEmployerRole.middleware");
const router = express.Router();
router
  .route("/register-employer")
  .post(registerEmployerValidation, registerEmployer);
router
  .route("/update-employer/:id")
  .put(updateEmployerValidation, updateEmployer);
router
  .route("/employer")
  .get(authMiddleware, checkEmployerRole, getSpecificEmployeer);

module.exports = router;
