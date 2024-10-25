const { getEducationDetailsDb } = require("../users/repo/jobSeeker.repo");
const { CustomError } = require("../utils/apiResponse");
module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const isEducationDetailsAdded = await getEducationDetailsDb(userId);
    if (!isEducationDetailsAdded) {
      return next(
        new CustomError(
          "[Please Add Education Details first in Profile Section]",
          403
        )
      );
    }
    next();
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};
