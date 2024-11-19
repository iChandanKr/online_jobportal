const { dataModel, redis } = require("../dbConnection");
const { User, UserRole, Role } = dataModel;
redis;
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

const createSessionDB = async (user_id, refreshToken) => {
  // return await RefreshToken.create(
  //   { userId: user_id, refreshToken },
  //   {
  //     transaction: t,
  //   }
  // );
  await redis.setex(
    `refreshToken:${user_id}`,
    process.env.REFRESH_TOKEN_EXPIRESIN,
    refreshToken
  );
  return await redis.get(`refreshToken:${user_id}`);
};

const stopSessionDB = async (id) => {
  // return await RefreshToken.destroy({
  //   where: {
  //     userId: id,
  //     refreshToken,
  //   },
  // });
  return await redis.del(`refreshToken:${id}`);
};

// for the case user update password
// const stopSessionDBforUser = async (id) => {
//   return await RefreshToken.destroy({
//     where: {
//       userId: id,
//     },
//   });
// };

const findRefreshTokenDb = async (refreshToken, userId) => {
  // return await RefreshToken.findOne({ where: { refreshToken } });
  const existingRefreshToken = await redis.get(`refreshToken:${userId}`);
  return existingRefreshToken === refreshToken;
};

const updatePasswordDB = async (id, newPassword) => {
  return await User.update(
    { password: newPassword },
    {
      where: {
        id,
      },
      individualHooks: true,
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
  updatePasswordDB,
  // stopSessionDBforUser,
};
