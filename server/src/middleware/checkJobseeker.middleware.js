const { dataModel } = require("../dbConnection");
const { User, Role } = dataModel;
const { CustomError } = require("../utils/apiResponse");

const checkJobseekerRole = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const checkIfUserIsJobseeker = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          where: { role: "jobseeker" },
        },
      ],
    });
    const isJobseeker = checkIfUserIsJobseeker ? true : false;

    if (!isJobseeker) {
      return next(
        new CustomError("[Access denied: User is not a Jobseeker]", 403)
      );
    }

    next();
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};

module.exports = checkJobseekerRole;
