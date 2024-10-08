const JobseekerService = require("../services/jobSeeker.services");
const resObj = require("../../utils/response");

const registerJobseeker = async (req, res, next) => {
  req.body.role = "jobseeker";
  try {
    const createdUser = await JobseekerService.createUserService(req.body);

    const { accessToken, refreshToken } = createdUser.dataValues;
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    resObj(res, 201, "User Created successfully", createdUser);
  } catch (err) {
    next(err);
  }
};

const findJobseeker = async (req, res,next) => {
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
    next(err)
  }
};
const updateJobseeker = async (req, res,next) => {
  try {
    const id = req.params.id;
    const userData = req.body;

    const updatedUser = await JobseekerService.updateJobseekerService(
      id,
      userData
    );

    const userResponse = updatedUser.toJSON();

    delete userResponse.password;

    resObj(res, 200, "User updated successfully", userResponse);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  registerJobseeker,
  findJobseeker,
  updateJobseeker,
};
