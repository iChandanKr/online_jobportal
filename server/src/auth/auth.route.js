const express = require("express");
const router = express.Router();
const { userLogin } = require("./auth.controller");
router.route("/login").post(userLogin);

module.exports = router;
