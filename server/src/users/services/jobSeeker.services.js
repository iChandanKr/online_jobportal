const { createJobseekerDb } = require("../repo/jobSeeker.repo");
class JobseekerService {
  static createUserService = async (userData) => {
    const response =  await createJobseekerDb(userData);
    delete response.dataValues.password;
    return response
  };
}
module.exports = JobseekerService;
