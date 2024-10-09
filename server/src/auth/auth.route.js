const express = require("express");
const router = express.Router();
const { userLogin, logoutUser } = require("./auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const {
  loginValidation,
  logoutValidator,
} = require("../middleware/joiValidation.middleware");
router.route("/login").post(loginValidation, userLogin);

// protected routes
router.route("/logout").post(logoutValidator, authMiddleware, logoutUser);

module.exports = router;
