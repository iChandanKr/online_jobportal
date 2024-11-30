const { CustomError, respondOk } = require("../../utils/apiResponse");
const JobseekerService = require("../services/jobSeeker.services");
const uuid = require("uuid");

const findJobseekerById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (id) {
      const isvalid = uuid.validate(id) && uuid.version(id) === 4;
      if (!isvalid) {
        throw new CustomError("Invalid UUID format", 400);
      }
    }
    const user = await JobseekerService.findJobseekerService(id);
    if (user) {
      respondOk(res, 200, "User Retrieved successfully", user);
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    if (id) {
      const isvalid = uuid.validate(id) && uuid.version(id) === 4;
      if (!isvalid) {
        throw new CustomError("Invalid UUID format", 400);
      }
    }

    const updatedUser = await JobseekerService.updateJobseekerService(
      id,
      userData
    );

    const userResponse = updatedUser.toJSON();

    delete userResponse.password;
    delete userResponse.deletedAt;

    respondOk(res, 200, "User updated successfully", userResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findJobseekerById,
  updateUser,
};
