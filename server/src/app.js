const express = require("express");
const app = express();
const userRoute = require("./users/users.route");

app.use(express.json());
app.use("/api/v1/users", userRoute);

module.exports = app;
