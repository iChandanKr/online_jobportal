const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const { createJobPostDb, getAllJobsDB } = require("./jobs.repo");

class JobService {
  static createJobPostService = async (jobpostdata) => {
    const result = await sequelize.transaction(async (t) => {
      return await createJobPostDb(jobpostdata, t);
    });
    return result;
  };

  static getAllJobsService = async () => {
    const jobs = await getAllJobsDB();
    return jobs;
  };
}
module.exports = JobService;
