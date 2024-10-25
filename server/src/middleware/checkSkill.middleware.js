const { checkSkillDB } = require("../users/repo/jobSeeker.repo");
const { CustomError } = require("../utils/apiResponse");
module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const isSkillsAdded = await checkSkillDB(userId);
    if (!isSkillsAdded) {
      return next(
        new CustomError("[Please Add Skills  first in Profile Section]", 403)
      );
    }
    next();
  } catch (error) {
    next(new CustomError(error.message, 404));
  }
};
