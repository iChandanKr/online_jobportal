const express = require("express");
const router = express.Router();
const { userLogin,logoutUser } = require("./auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
router.route("/login").post(userLogin);

// protected routes
router.route("/logout").post(authMiddleware,logoutUser);

module.exports = router;
