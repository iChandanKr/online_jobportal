const express = require("express");
const router = express.Router();
const {
  userLogin,
  logoutUser,
  updateUserPassword,
} = require("./auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const lockoutMiddleware = require("../middleware/lockout.middleware");
const apiSchema = require("../utils/apiSchema");
const { validateRequest } = require("../middleware/joiValidation.middleware");

router
  .route("/login")
  .post(validateRequest(apiSchema.loginSchema), lockoutMiddleware, userLogin);
router.route("/auth/check").get(authMiddleware, (req, res) => {
  res.status(200).json({ authenticated: true, user: req.user });
});

// protected routes
router
  .route("/logout")
  .post(validateRequest(apiSchema.logoutSchema), authMiddleware, logoutUser);
router
  .route("/password-update")
  .patch(
    validateRequest(apiSchema.updatePasswordSchema),
    authMiddleware,
    updateUserPassword
  );

module.exports = router;
