const express = require("express");
const {
  registerEmployer,
  updateEmployer,
  getSpecificEmployeer,
  getApplicantsbySearch
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
  .route("/update-employer")
  .put(
    updateEmployerValidation,
    authMiddleware,
    checkEmployerRole,
    updateEmployer
  );
router
  .route("/employer")
  .get(authMiddleware, checkEmployerRole, getSpecificEmployeer);
router 
  .route("/getApplicantsbySearch")
  .get(authMiddleware,checkEmployerRole,getApplicantsbySearch)

module.exports = router;
