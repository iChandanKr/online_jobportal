const { dataModel } = require("../dbConnection");
const { User, Role, Employer } = dataModel;
const { CustomError } = require("../utils/apiResponse");

const checkEmployerRole = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const employer = await Employer.findOne({
      where: { userId: userId },
    });
    if (!employer) {
      return next(
        new CustomError("You don't have right to perform this operation", 403)
      );
    }
    const checkIfUserIsEmployer = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          where: { role: "employer" },
        },
      ],
    });
    const isEmployer = checkIfUserIsEmployer ? true : false;

    if (!isEmployer) {
      return next(
        new CustomError("[Access denied: User is not an employer]", 403)
      );
    }
    req.empId = employer.empId;
    next();
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};

module.exports = checkEmployerRole;
