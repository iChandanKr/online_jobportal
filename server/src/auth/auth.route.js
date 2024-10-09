const express = require("express");
const router = express.Router();
const { userLogin, logoutUser } = require("./auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const {
  loginValidation,
  logoutValidator,
} = require("../middleware/joiValidation.middleware");
router.route("/login").post(loginValidation, userLogin);
router.route("/auth/check").get(authMiddleware, (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
});

// protected routes
router.route("/logout").post(logoutValidator, authMiddleware, logoutUser);

module.exports = router;
