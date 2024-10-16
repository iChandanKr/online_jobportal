const { dataModel } = require("../dbConnection");
const { RefreshToken, User, UserRole, Role } = dataModel;

const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

const findUserById = async (id) => {
  return await User.findByPk(id);
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

const stopSessionDB = async (id, refreshToken) => {
  return await RefreshToken.destroy({
    where: {
      userId: id,
      refreshToken,
    },
  });
};

const findRefreshTokenDb = async (refreshToken) => {
  return await RefreshToken.findOne({ where: { refreshToken } });
};

const updatePasswordDB = async (id, newPassword) => {
  return await User.update(
    { password: newPassword },
    {
      where: {
        id,
      },
      individualHooks: true
    }
  );
};
module.exports = {
  createSessionDB,
  findUserByEmail,
  roleDetails,
  verifyUserRoleDB,
  findUserById,
  stopSessionDB,
  findRefreshTokenDb,
  updatePasswordDB
};
