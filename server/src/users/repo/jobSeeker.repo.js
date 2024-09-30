const { dataModel } = require("../../dbConnection");
const { Role, UserRole, User } = dataModel;

const createJobseekerDb = async (userData, t) => {
  const role = await Role.findOne({
    where: { role: userData.role },
  });
  const newUser = await User.create(userData, {
    transaction: t,
  });
  await UserRole.create(
    { UserId: newUser.dataValues?.id, RoleId: role.dataValues?.id },
    { transaction: t }
  );
  return newUser;
};

const findJobseekerDB = async (id) => {
  return await User.findOne({ where: { id } });
};
module.exports = {
  createJobseekerDb,
  findJobseekerDB,
};
