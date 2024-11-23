const JobseekerService = require("../services/jobSeeker.services");
const uuid = require("uuid");
const { CustomError, respondOk } = require("../../utils/apiResponse");
const registerJobseeker = async (req, res, next) => {
  req.body.role = "jobseeker";
  try {
    const createdUser = await JobseekerService.createUserService(req.body);

    const { accessToken, refreshToken } = createdUser.dataValues;
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    respondOk(res, 201, "User Created successfully", createdUser);
  } catch (err) {
    next(err);
  }
};

const findJobseeker = async (req, res, next) => {
  const id = req.user.id;

  if (id) {
    const isvalid = uuid.validate(id) && uuid.version(id) === 4;
    if (!isvalid) {
      next(new CustomError("Invalid UUID format", 400));
    }
  }

  try {
    const jobSeeker = await JobseekerService.findJobseekerService(id);
    res.status(200).json({
      status: "success",
      message: "User Retrieved successfully",
      data: jobSeeker,
    });
  } catch (err) {
    next(err);
  }
};
const updateJobseeker = async (req, res, next) => {
  try {
    const id = req.user.id;
    const userData = req.body;

    const updatedUser = await JobseekerService.updateJobseekerService(
      id,
      userData
    );

    const userResponse = updatedUser.toJSON();

    delete userResponse.password;

    respondOk(res, 200, "User updated successfully", userResponse);
  } catch (error) {
    next(error);
  }
};

const addEducationDetails = async (req, res, next) => {
  try {
    const addEducation = await JobseekerService.addEducationDetailsService(
      req.user.id,
      req.body
    );

    if (addEducation) {
      respondOk(
        res,
        201,
        "[Education Details Updated Successfully]",
        addEducation
      );
    }
  } catch (error) {
    next(error);
  }
};

const addSkills = async (req, res, next) => {
  try {
    const addedSkills = await JobseekerService.addSkillsService(
      req.user.id,
      req.body.skills
    );
    if (addedSkills) {
      respondOk(res, 201, "[Skill added successfully]", addedSkills);
    }
  } catch (error) {
    next(error);
  }
};

const getEducationDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const educationDetails = await JobseekerService.getEducationDetailsService(
      userId
    );
    respondOk(
      res,
      200,
      "[Education Details Retrieved Successfully]",
      educationDetails
    );
  } catch (error) {
    next(error);
  }
};

const updateEducationDetails = async (req, res, next) => {
  try {
    const updatedDetails = await JobseekerService.updateEducationDetailsService(
      req.user.id,
      req.body
    );

    respondOk(
      res,
      200,
      "Education Details Updated Successfuly!",
      updatedDetails
    );
  } catch (error) {
    next(error);
  }
};

const getJobseekerDetails = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const jobSeekerSkills = await JobseekerService.getJobseekerDetailService(
      userId
    );
    if (jobSeekerSkills) {
      respondOk(res, 200, "[Jobseeker Profile Details]", jobSeekerSkills);
    }
  } catch (error) {
    next(error);
  }
};

const getJobseekerSkills = async (req, res, next) => {
  try {
    const skills = await JobseekerService.getJobseekerSkills(req.user.id);
    if (skills) {
      respondOk(res, 200, "[Details of Jobseeker Skills]", skills);
    }
  } catch (error) {
    next(error);
  }
};

const updateJobseekerSkills = async (req, res, next) => {
  try {
    const { skills } = req.body;
    const updatedSkills = await JobseekerService.updateJobseekerSkillsService(
      req.user.id,
      skills
    );
    respondOk(res, 200, "Skills Updated successfully", updatedSkills);
  } catch (error) {
    next(error);
  }
};

const getAllApplicationOfUser = async (req, res, next) => {
  try {
    const applications = await JobseekerService.getAllApplicationsOfUserService(
      req.user.id
    );
    if (applications) {
      respondOk(
        res,
        200,
        "There are the applications You have applied for",
        applications
      );
    }
  } catch (error) {
    next(error);
  }
};

const getAllApplications = async (req, res, next) => {
  try {
    const applications = await JobseekerService.getAllApplicationsService(req);
    respondOk(res, 200, "Fteched applications", applications);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await JobseekerService.getAllUserService(req);
    if (users) {
      respondOk(res, 200, "All Users of Application", users);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await JobseekerService.deleteUserService(req.params.id);
    if (deletedUser >= 1) {
      respondOk(res, 200, "user has been deleted successfully");
    } else {
      throw new CustomError("User not found", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerJobseeker,
  findJobseeker,
  updateJobseeker,
  addEducationDetails,
  addSkills,
  getEducationDetails,
  getJobseekerDetails,
  getJobseekerSkills,
  updateEducationDetails,
  updateJobseekerSkills,
  getAllApplicationOfUser,
  getAllApplications,
  getAllUsers,
  deleteUser,
};
