const express = require("express");
const {
  registerEmployer,
  updateEmployer,
  getSpecificEmployeer,
  getApplicantsbySearch,
} = require("../controller/employer.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const {
  validateRequest,
} = require("../../middleware/joiValidation.middleware");
const apiSchema = require("../../utils/apiSchema");
const checkEmployerRole = require("../../middleware/checkEmployerRole.middleware");
const router = express.Router();
router
  .route("/register-employer")
  .post(validateRequest(apiSchema.registerEmployerSchema), registerEmployer);
router
  .route("/update-employer")
  .put(
    validateRequest(apiSchema.updateEmployerSchema),
    authMiddleware,
    checkEmployerRole,
    updateEmployer
  );
router
  .route("/employer")
  .get(authMiddleware, checkEmployerRole, getSpecificEmployeer);
router
  .route("/getApplicantsbySearch")
  .get(authMiddleware, checkEmployerRole, getApplicantsbySearch);

module.exports = router;
