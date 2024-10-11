const SkillsService = require("./skills.service");
const { respondOk } = require("../utils/apiResponse");
const getAllSkills = async (req, res, next) => {
  try {
    const skills = await SkillsService.getAllSkills();
    respondOk(res, 200, "Skills Fetched successfully", skills);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllSkills };
