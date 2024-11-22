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
  getAllApplications,
} = require("../controller/jobSeeker.controller");
const {
  validateRequest,
} = require("../../middleware/joiValidation.middleware");
const checkJobseekerRole = require("../../middleware/checkJobseeker.middleware");
const apiSchema = require("../../utils/apiSchema");
const authMiddleware = require("../../middleware/auth.middleware");
const router = express.Router();
router
  .route("/register-jobseeker")
  .post(validateRequest(apiSchema.registerJobSeekerSchema), registerJobseeker);
router
  .route("/jobseeker")
  .get(authMiddleware, checkJobseekerRole, findJobseeker);
router
  .route("/update-jobseeker")
  .put(
    validateRequest(apiSchema.updateJobseekerSchema),
    authMiddleware,
    checkJobseekerRole,
    updateJobseeker
  );
router
  .route("/add-educationDetails")
  .post(
    validateRequest(apiSchema.addEducationSchema),
    authMiddleware,
    checkJobseekerRole,
    addEducationDetails
  );
router
  .route("/add-skills")
  .post(
    validateRequest(apiSchema.addSkillSchema),
    authMiddleware,
    checkJobseekerRole,
    addSkills
  );

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
  .get(
    validateRequest(apiSchema.getJobseekerProfileSchema),
    authMiddleware,
    getJobseekerDetails
  );
router
  .route("/applications")
  .get(authMiddleware, checkJobseekerRole, getAllApplications);

module.exports = router;
