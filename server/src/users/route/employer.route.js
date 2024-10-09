
const express = require("express");
const {registerEmployer,updateEmployer} = require('../controller/employer.controller');
const {
  registerEmployerValidation,
} = require("../../middleware/joiValidation.middleware");
const router = express.Router();
router
  .route("/register-employer")
  .post(registerEmployerValidation, registerEmployer);
router.route('/update-employer/:id').put(updateEmployer)


module.exports = router;
