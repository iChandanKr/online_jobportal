const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const {
  getAllUsers,
  deleteUser,
  lockMultipleUsers,
  unlockMultipleUsers,
} = require("../controller/jobSeeker.controller");
const checkAdminRole = require("../../middleware/checkAdmin.middleware");

const router = express.Router();

router.route("/get-all-user").get(authMiddleware, checkAdminRole, getAllUsers);
router
  .route("/user-delete/:id")
  .get(authMiddleware, checkAdminRole, deleteUser);
router
  .route("/lock-users")
  .put(authMiddleware, checkAdminRole, lockMultipleUsers);

router
  .route("/unlock-users")
  .put(authMiddleware, checkAdminRole, unlockMultipleUsers);
module.exports = router;
