const express = require("express");
const router = express.Router();
const { createJobPost, getAllJobs,deleteJob } = require("./jobs.controller");
const authMiddleware = require("../middleware/auth.middleware");
const checkEmployerRole = require("../middleware/checkEmployerRole.middleware");
const { jobPostValidation } = require("../middleware/joiValidation.middleware");

router
  .route("/add-jobpost")
  .post(jobPostValidation, authMiddleware, checkEmployerRole, createJobPost);
router.route("/jobs").get(authMiddleware, checkEmployerRole, getAllJobs);
router.route("/delete-job/:id").delete(authMiddleware, checkEmployerRole,deleteJob)
router.route("/update-job").put(authMiddleware,checkEmployerRole)
module.exports = router;
