const JobseekerService = require("../services/jobSeeker.services");
const resObj = require("../../utils/response");

const registerJobseeker = async (req, res) => {
  req.body.role = "jobseeker";
  try {
    const createdUser = await JobseekerService.createUserService(req.body);
    const { accessToken, refreshToken } = createdUser.dataValues;
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    resObj(res, 201, "User Created successfully", createdUser);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Don't able to create user!!",
      error: err,
    });
  }
};

const findJobseeker = async (req, res) => {
  try {
    const jobSeeker = await JobseekerService.findJobseekerService(
      req.params.id
    );
    res.status(201).json({
      status: "success",
      message: "User Created successfully",
      data: jobSeeker,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Don't able to find user!!",
      error: err,
    });
  }
};
module.exports = {
  registerJobseeker,
  findJobseeker,
};
