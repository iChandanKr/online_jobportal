
const express = require("express");
const {registerEmployer,updateEmployer} = require('../controller/employer.controller');
const {
  registerEmployerValidation,
  updateEmployerValidation
} = require("../../middleware/joiValidation.middleware");
const router = express.Router();
router
  .route("/register-employer")
  .post(registerEmployerValidation, registerEmployer);
router.route('/update-employer/:id').put(updateEmployerValidation,updateEmployer)


module.exports = router;
