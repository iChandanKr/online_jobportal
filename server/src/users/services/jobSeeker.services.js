const {
  createJobseekerDb,
  findJobseekerDB,
} = require("../repo/jobSeeker.repo");
class JobseekerService {
  static createUserService = async (userData) => {
    const response = await createJobseekerDb(userData);
    delete response.dataValues.password;
    return response;
  };

  static findJobseekerService = async (id) => {
    const res = await findJobseekerDB(id);
    // console.log(res);
    if (res) {
      return res;
    }
    throw new Error("user not found");
  };
}
module.exports = JobseekerService;
