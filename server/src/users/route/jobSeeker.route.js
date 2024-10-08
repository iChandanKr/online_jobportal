const express = require('express');
const {registerJobseeker, findJobseeker} = require('../controller/jobSeeker.controller');
const { registerUserValidation } = require('../../middleware/joiValidation.middleware');
const router = express.Router();
router.route('/register-jobseeker').post(registerUserValidation,registerJobseeker);
router.route('/jobseeker/:id').get(findJobseeker)

module.exports = router;