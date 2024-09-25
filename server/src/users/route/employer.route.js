const express = require('express');
const {registerEmployer} = require('../controller/employer.controller');
const router = express.Router();
router.route('/register-employer').post(registerEmployer);

module.exports = router;