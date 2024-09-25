const express = require('express');
const {registerJobseeker} = require('../controller/jobSeeker.controller');
const router = express.Router();
router.route('/register-jobseeker').post(registerJobseeker);

module.exports = router;