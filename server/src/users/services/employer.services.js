const { createEmployerDb } = require("../repo/employer.repo");
class EmployerService {
  static createEmployerService = async (employerData) => {
    const response = await createEmployerDb(employerData);
    delete response.dataValues.password;
    return response;
  };
}
module.exports = EmployerService;
