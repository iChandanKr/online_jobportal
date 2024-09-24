const { dataModel } = require("../../dbConnection");
const { User, Role, UserRole, sequelize } = dataModel;

const createUserDb = async (userData) => {
  let roleId;
  let result;
  try {
    result = await sequelize.transaction(async (t) => {
      const existingRole = await Role.findOne({
        where: { role: userData.role },
      });
      if (!existingRole) {
        const res = await Role.create(userData.role, { transaction: t });
        roleId = res.dataValues.id;
      } else {
        roleId = existingRole.dataValues.id;
      }
      const newUser = await User.create(userData, { transaction: t });
      await UserRole.create(
        { UserId: newUser.dataValues.id ,RoleId:roleId},
        { transaction: t }
      );
      return newUser;
    });
  } catch (error) {
    throw error.message;
  }
  return result;
};
module.exports = {
  createUserDb,
};
