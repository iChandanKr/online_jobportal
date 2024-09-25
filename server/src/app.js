const express = require("express");
const app = express();
const jobSeekerRoute = require("./users/route/jobSeeker.route");
const employerRoute = require("./users/route/employer.route");

app.use(express.json());
app.use("/api/v1/users", jobSeekerRoute);
app.use("/api/v1/users", employerRoute);

module.exports = app;
