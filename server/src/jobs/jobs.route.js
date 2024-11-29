const express = require("express");
const multer = require("multer");
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
  getAllApplicants,
  updateApplicationStatus,
  getOpenJobsOfEmployer,
  getClosedJobsOfEmployer,
  getPostedJobPermonthOfEmployer,
  bulkCreateJobs,
} = require("./jobs.controller");
const authMiddleware = require("../middleware/auth.middleware");
const checkEduMiddleware = require("../middleware/checkEducation.middleware");
const checkSkillMiddleware = require("../middleware/checkSkill.middleware");
const checkEmployerRole = require("../middleware/checkEmployerRole.middleware");
const { validateRequest } = require("../middleware/joiValidation.middleware");
const apiSchema = require("../utils/apiSchema");
const checkJobseekerRole = require("../middleware/checkJobseeker.middleware");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory for file storage
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname); // Extract the file extension
    const baseName = path.basename(file.originalname, ext);

    cb(null, `${timestamp}-${baseName}${ext}`);
  },
});
const upload = multer({ storage: storage });
router
  .route("/add-jobpost")
  .post(
    validateRequest(apiSchema.jobPostSchema),
    authMiddleware,
    checkEmployerRole,
    createJobPost
  );
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
    validateRequest(apiSchema.applyJob),
    authMiddleware,
    checkJobseekerRole,
    checkEduMiddleware,
    checkSkillMiddleware,
    applyJob
  );
router.route("/jobs-opening").get(getAllOpenJobs);
router.route("/jobs-userCanApply").get(authMiddleware, jobsUserCanApply);
router
  .route("/applicants/all")
  .get(authMiddleware, checkEmployerRole, getAllApplicants);
router
  .route("/applicants/:id")
  .get(authMiddleware, checkEmployerRole, applicantOfAJob);

router
  .route("/application/update")
  .patch(authMiddleware, checkEmployerRole, updateApplicationStatus);

router
  .route("/open-jobs")
  .get(authMiddleware, checkEmployerRole, getOpenJobsOfEmployer);

router
  .route("/closed-jobs")
  .get(authMiddleware, checkEmployerRole, getClosedJobsOfEmployer);

router
  .route("/jobs-permonth")
  .get(authMiddleware, checkEmployerRole, getPostedJobPermonthOfEmployer);
router.route("/jobs-bulk-create").post(upload.single("file"), bulkCreateJobs);
module.exports = router;
