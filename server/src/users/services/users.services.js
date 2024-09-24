const { createUserDb } = require("../repo/users.repo");
class UserService {
  static createUserService = async (userData) => {
    const response =  await createUserDb(userData);
    delete response.dataValues.password;
    return response
  };
}
module.exports = UserService;
