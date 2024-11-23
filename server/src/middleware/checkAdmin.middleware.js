const { dataModel } = require("../dbConnection");
const { User, Role } = dataModel;
const { CustomError } = require("../utils/apiResponse");

const checkAdminRole = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const checkIfUserIsAdmin = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Role,
          where: { role: "admin" },
        },
      ],
    });
    const isAdmin = checkIfUserIsAdmin ? true : false;

    if (!isAdmin) {
      return next(
        new CustomError("[Access denied: User is not an admin]", 403)
      );
    }
    next();
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};

module.exports = checkAdminRole;
