const express = require("express");
const {
  registerJobseeker,
  findJobseeker,
  updateJobseeker,
  addEducationDetails,
  addSkills,
} = require("../controller/jobSeeker.controller");
const {
  registerJobseekerValidation,
  updateJobseekerValidation,
  addEducationValidation,
  addSkillValidation,
} = require("../../middleware/joiValidation.middleware");
const checkJobseekerRole = require("../../middleware/checkJobseeker.middleware");
const authMiddleware = require("../../middleware/auth.middleware");
const router = express.Router();
router
  .route("/register-jobseeker")
  .post(registerJobseekerValidation, registerJobseeker);
router.route("/jobseeker/:id").get(findJobseeker);
router
  .route("/update-jobseeker/:id")
  .put(updateJobseekerValidation, updateJobseeker);
router
  .route("/add-educationDetails")
  .post(
    addEducationValidation,
    authMiddleware,
    checkJobseekerRole,
    addEducationDetails
  );
router
  .route("/add-skills")
  .post(addSkillValidation, authMiddleware, checkJobseekerRole, addSkills);

module.exports = router;
