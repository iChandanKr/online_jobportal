const express = require("express");
const router = express.Router();
const { userLogin, logoutUser } = require("./auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const joiValidator = require("./joiValidation");
router.route("/login").post(joiValidator, userLogin);

// protected routes
router.route("/logout").post(authMiddleware, logoutUser);

module.exports = router;
