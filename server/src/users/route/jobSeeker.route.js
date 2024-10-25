const express = require("express");
const {
  registerJobseeker,
  findJobseeker,
  updateJobseeker,
  addEducationDetails,
  addSkills,
  getEducationDetails,
  getJobseekerDetails,
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
router
  .route("/jobseeker")
  .get(authMiddleware, checkJobseekerRole, findJobseeker);
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
router
  .route("/get-educationDetails")
  .get(authMiddleware, checkJobseekerRole, getEducationDetails);

router.route("/jobseeker-details").get(authMiddleware, getJobseekerDetails);

module.exports = router;
