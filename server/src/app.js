const express = require("express");
const app = express();
const cors = require('cors')
const jobSeekerRoute = require("./users/route/jobSeeker.route");
const employerRoute = require("./users/route/employer.route");
const globalErrorHandler = require("./utils/globalErrorHandler");

app.use(express.json());
app.use(cors({
    origin:'*',
    credentials: true,
    exposedHeaders: ['Authorization']
}))
app.use("/api/v1/users", jobSeekerRoute);
app.use("/api/v1/users", employerRoute);


app.use(globalErrorHandler);
module.exports = app;
