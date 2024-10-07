const express = require('express');
const {registerJobseeker, findJobseeker,updateJobseeker} = require('../controller/jobSeeker.controller');
const router = express.Router();
router.route('/register-jobseeker').post(registerJobseeker);
router.route('/jobseeker/:id').get(findJobseeker)
router.route('/update-jobseeker/:id').put(updateJobseeker)

module.exports = router;