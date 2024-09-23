const { createUserDb } = require("./users.repo");
class UserService {
  static createUserService = async (userData) => {
    const response =  await createUserDb(userData);
    delete response.dataValues.password;
    delete response.dataValues.confirmPassword;
    return response
  };
}
module.exports = UserService;
