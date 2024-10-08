const express = require('express');
const {registerEmployer,updateEmployer} = require('../controller/employer.controller');
const router = express.Router();
router.route('/register-employer').post(registerEmployer);
router.route('/update-employer/:id').put(updateEmployer)

module.exports = router;