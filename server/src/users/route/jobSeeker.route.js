const express = require('express');
const {registerJobseeker, findJobseeker} = require('../controller/jobSeeker.controller');
const router = express.Router();
router.route('/register-jobseeker').post(registerJobseeker);
router.route('/jobseeker/:id').get(findJobseeker)

module.exports = router;