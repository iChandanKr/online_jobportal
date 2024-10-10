const express = require('express');
const {registerJobseeker, findJobseeker,updateJobseeker} = require('../controller/jobSeeker.controller');
const { registerJobseekerValidation,updateJobseekerValidation } = require('../../middleware/joiValidation.middleware');
const router = express.Router();
router.route('/register-jobseeker').post(registerJobseekerValidation,registerJobseeker);
router.route('/jobseeker/:id').get(findJobseeker)
router.route('/update-jobseeker/:id').put(updateJobseekerValidation,updateJobseeker)

module.exports = router;