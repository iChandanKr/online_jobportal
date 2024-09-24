const express = require('express');
const {registerUser} = require('./users.controller');
const router = express.Router(registerUser);
router.route('/register-jobseeker').post(registerUser);

module.exports = router;