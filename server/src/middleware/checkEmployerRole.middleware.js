const { dataModel } = require("../dbConnection");
const { UserRole, Role, Employer } = dataModel;
const CustomError = require("../utils/customError");

const checkEmployerRole = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // if (!userId) {
    //   return next(new CustomError("empId not provided in request", 400));
    // }

    const employer = await Employer.findOne({
      where: { userId: userId },
    });

    if (!employer) {
      return next(
        new CustomError("You don't have right to perform this operation", 403)
      );
    }

    const userRole = await UserRole.findOne({
      where: { UserId: userId },
      include: [
        {
          model: Role,
          attributes: ["role"],
        },
      ],
    });

    if (!userRole || !userRole.Role) {
      return next(new CustomError("User role not found", 404));
    }

    const roleName = userRole.Role.role;

    if (roleName !== "employer") {
      return next(
        new CustomError("Access denied: User is not an employer", 403)
      );
    }

    req.empId = employer.empId;
    next();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = checkEmployerRole;
