const { dataModel } = require("../dbConnection");
const User = dataModel.User;

const createUserDb = async (userData) => await User.create(userData);

module.exports = {
  createUserDb,
};
