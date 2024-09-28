const { dataModel } = require("../../dbConnection");
const { Role, UserRole, sequelize, User } = dataModel;

const createJobseekerDb = async (userData) => {
  let result;
  try {
    result = await sequelize.transaction(async (t) => {
      const roleId = await Role.findOne({
        where: { role: userData.role },
      });
      const newUser = await User.create(userData, {
        transaction: t,
      });
      await UserRole.create(
        { UserId: newUser.dataValues?.id, RoleId: roleId.dataValues?.id },
        { transaction: t }
      );
      return newUser;
    });
  } catch (error) {
    throw error.message;
  }
  return result;
};

const findJobseekerDB = async (id) => {
  return await User.findOne({ where: { id } });
};
module.exports = {
  createJobseekerDb,
  findJobseekerDB,
};
