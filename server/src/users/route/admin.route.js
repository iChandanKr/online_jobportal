const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const {
  getAllUsers,
  deleteUser,
  lockMultipleUsers,
  unlockMultipleUsers,
} = require("../controller/jobSeeker.controller");
const checkAdminRole = require("../../middleware/checkAdmin.middleware");
const {
  updateUser,
  findJobseekerById,
} = require("../controller/admin.controller");

const router = express.Router();

router.route("/get-all-user").get(authMiddleware, checkAdminRole, getAllUsers);
router.route("/user-delete").delete(authMiddleware, checkAdminRole, deleteUser);
router
  .route("/lock-users")
  .put(authMiddleware, checkAdminRole, lockMultipleUsers);

router
  .route("/unlock-users")
  .put(authMiddleware, checkAdminRole, unlockMultipleUsers);

router
  .route("/admin/app-user/:id")
  .get(authMiddleware, checkAdminRole, findJobseekerById);
router
  .route("/admin/app-user/update/:id")
  .patch(authMiddleware, checkAdminRole, updateUser);
module.exports = router;
