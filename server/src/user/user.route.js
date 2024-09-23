const express = require('express');
const {registerUser} = require('./users.controller');
const router = express.Router(registerUser);
router.route('/').post(registerUser);

module.exports = router;