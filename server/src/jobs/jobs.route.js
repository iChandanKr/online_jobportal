const express = require("express");
const router = express.Router();
const {
  createJobPost,
  getAllJobs,
  deleteJob,
  applyJob,
  getAllOpenJobs,
  updateJobPost,
  getJobById
} = require("./jobs.controller");
const authMiddleware = require("../middleware/auth.middleware");
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
router.route("/update-job/:id").put(authMiddleware, checkEmployerRole,updateJobPost);
router.route("/getJob/:id").get(authMiddleware,checkEmployerRole,getJobById)
router
  .route("/apply-job")
  .post(applyJobValidation, authMiddleware, checkJobseekerRole, applyJob);
router.route("/jobs-opening").get(getAllOpenJobs);
module.exports = router;
