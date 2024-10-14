const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jobSeekerRoute = require("./users/route/jobSeeker.route");
const employerRoute = require("./users/route/employer.route");
const skillsRoute = require("./skills/skills.route");
const authRoute = require("./auth/auth.route");
const globalErrorHandler = require("./utils/globalErrorHandler");
const jobs = require("./jobs/jobs.route");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    // exposedHeaders: ["Authorization"],
  })
);
app.use(cookieParser());
app.use("/api/v1/users", jobSeekerRoute);
app.use("/api/v1/users", employerRoute);
app.use("/api/v1/users", authRoute);
app.use("/api/v1/job", jobs);
app.use("/api/v1/skills", skillsRoute);

app.use(globalErrorHandler);
module.exports = app;
