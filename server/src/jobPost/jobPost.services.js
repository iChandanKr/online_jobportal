const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const { createJobPostDb } = require("./jobPost.repo");

class JobPostService {
  static createJobPostService = async (jobpostdata) => {
    const result = await sequelize.transaction(async (t) => {
      return await createJobPostDb(jobpostdata, t);
    });
    return result;
  };
}
module.exports = JobPostService;
