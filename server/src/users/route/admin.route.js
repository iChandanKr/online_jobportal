const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const {
  getAllUsers,
  deleteUser,
} = require("../controller/jobSeeker.controller");
const checkAdminRole = require("../../middleware/checkAdmin.middleware");

const router = express.Router();

router.route("/get-all-user").get(authMiddleware, checkAdminRole, getAllUsers);
router
  .route("/user-delete/:id")
  .get(authMiddleware, checkAdminRole, deleteUser);
module.exports = router;
