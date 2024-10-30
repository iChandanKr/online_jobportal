const express = require("express");
const {
  registerJobseeker,
  findJobseeker,
  updateJobseeker,
  addEducationDetails,
  addSkills,
  getEducationDetails,
  updateEducationDetails,
  getJobseekerDetails,
  getJobseekerSkills,
  updateJobseekerSkills,
  getAllApplicationOfUser,
} = require("../controller/jobSeeker.controller");
const {
  registerJobseekerValidation,
  updateJobseekerValidation,
  addEducationValidation,
  addSkillValidation,
  getJobseekerProfileValidation,
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
  .route("/update-jobseeker")
  .put(
    updateJobseekerValidation,
    authMiddleware,
    checkJobseekerRole,
    updateJobseeker
  );
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
  .route("/update-skills")
  .put(authMiddleware, checkJobseekerRole, updateJobseekerSkills);
router
  .route("/get-educationDetails")
  .get(authMiddleware, checkJobseekerRole, getEducationDetails);
router
  .route("/update-educationDetails")
  .put(authMiddleware, checkJobseekerRole, updateEducationDetails);
router
  .route("/jobseeker-skills")
  .get(authMiddleware, checkJobseekerRole, getJobseekerSkills);

router
  .route("/jobseeker-details/:id")
  .get(getJobseekerProfileValidation, authMiddleware, getJobseekerDetails);
router
  .route("/applications")
  .get(authMiddleware, checkJobseekerRole, getAllApplicationOfUser);

module.exports = router;
