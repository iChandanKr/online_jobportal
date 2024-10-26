const express = require("express");
const router = express.Router();
const {
  createJobPost,
  getAllJobs,
  deleteJob,
  applyJob,
  getAllOpenJobs,
  updateJobPost,
  getJobById,
  getJobDetails,
  jobsUserCanApply,
  applicantOfAJob,
} = require("./jobs.controller");
const authMiddleware = require("../middleware/auth.middleware");
const checkEduMiddleware = require("../middleware/checkEducation.middleware");
const checkSkillMiddleware = require("../middleware/checkSkill.middleware");
const checkEmployerRole = require("../middleware/checkEmployerRole.middleware");
const {
  jobPostValidation,
  applyJobValidation,
} = require("../middleware/joiValidation.middleware");
const checkJobseekerRole = require("../middleware/checkJobseeker.middleware");

router
  .route("/add-jobpost")
  .post(jobPostValidation, authMiddleware, checkEmployerRole, createJobPost);
router.route("/jobs").get(authMiddleware, checkEmployerRole, getAllJobs);
router
  .route("/delete-job/:id")
  .delete(authMiddleware, checkEmployerRole, deleteJob);
router
  .route("/update-job/:id")
  .put(authMiddleware, checkEmployerRole, updateJobPost);
router.route("/getJob/:id").get(authMiddleware, checkEmployerRole, getJobById);
router.route("/job-details/:id").get(getJobDetails);
router
  .route("/apply-job")
  .post(
    applyJobValidation,
    authMiddleware,
    checkJobseekerRole,
    checkEduMiddleware,
    checkSkillMiddleware,
    applyJob
  );
router.route("/jobs-opening").get(getAllOpenJobs);
router.route("/jobs-userCanApply").get(authMiddleware, jobsUserCanApply);
router
  .route("/applicants/:id")
  .get(authMiddleware, checkEmployerRole, applicantOfAJob);
module.exports = router;
