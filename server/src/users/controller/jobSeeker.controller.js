const JobseekerService = require("../services/jobSeeker.services");

const registerJobseeker = async (req, res) => {
  req.body.role = 'jobseeker';
  try {
    const createdUser = await JobseekerService.createUserService(req.body);
    res.status(201).json({
      status: "success",
      message: "User Created successfully",
      data: createdUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Don't able to create user!!",
      error: err,
    });
  }
};

module.exports = {
  registerJobseeker,
};
