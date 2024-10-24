const { dataModel } = require("../../dbConnection");
const { Role, UserRole, User, Education, UserSkills } = dataModel;

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
  return await User.findOne({
    where: { id },
    attributes: {
      exclude: ["password", "passwordChangedAt", "createdAt", "updatedAt"],
    },
  });
};

const updateJobseekerDb = async (id, userData, t) => {
  const user = await User.findByPk(id, { transaction: t });

  if (!user) {
    throw new Error("User not found");
  }
  await user.update(
    {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dob: userData.dob,
      contact: userData.contact,
      city: userData.city,
      pinCode: userData.pinCode,
      state: userData.state,
      country: userData.country,
    },
    { transaction: t }
  );
  return user;
};

const addEducationDB = async (userId, educationDetails) => {
  return await Education.create({ ...educationDetails, userId });
};

const addSkillsDb = async (userId, skills) => {
  const userSkills = skills.map((skillId) => ({
    UserId: userId,
    SkillId: skillId,
  }));
  return await UserSkills.bulkCreate(userSkills);
};

module.exports = {
  createJobseekerDb,
  findJobseekerDB,
  updateJobseekerDb,
  addEducationDB,
  addSkillsDb,
};
