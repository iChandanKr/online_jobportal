const { dataModel } = require("../dbConnection");
const { RefreshToken, User, UserRole, Role } = dataModel;

const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

const roleDetails = async (role) => {
 return await Role.findOne({ where: { role } });
};

const verifyUserRoleDB = async (roleId, userId) => {
  return await UserRole.findOne({
    where: { UserId: userId, RoleId: roleId },
  });
};

const createSessionDB = async (user_id, refreshToken, t) => {
  return await RefreshToken.create(
    { userId: user_id, refreshToken },
    {
      transaction: t,
    }
  );
};
module.exports = {
  createSessionDB,
  findUserByEmail,
  roleDetails,
  verifyUserRoleDB,
};
