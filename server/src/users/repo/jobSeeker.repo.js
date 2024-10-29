const { dataModel } = require("../../dbConnection");
const {
  Role,
  UserRole,
  User,
  Education,
  UserSkills,
  Skill,
  JobPost,
  Application,
} = dataModel;

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

const getEducationDetailsDb = async (userId) => {
  const educationDetails = await Education.findOne({
    where: { userId },
  });
  return educationDetails;
};

const updateEducationDetailsDb = async (userId, educationDetails) => {
  return await Education.update(educationDetails, {
    where: { userId },
  });
};

const jobseekerDetailsDB = async (userId) => {
  return User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ["password", "passwordChangedAt", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Skill,
        through: {
          attributes: [],
        },
      },
      {
        model: Education,
        as: "Education_Details",
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "userId"],
        },
      },
    ],
  });
};

const jobSeekerSkills = async (userId) => {
  return User.findOne({
    where: {
      id: userId,
    },
    attributes: [],
    include: [
      {
        model: Skill,
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const checkSkillDB = async (userId) => {
  return await UserSkills.findOne({
    where: {
      UserId: userId,
    },
  });
};

const updateJobseekerSkillsDb = async (userId, skills) => {
  await UserSkills.destroy({
    where: { UserId: userId },
  });
  const userSkills = skills.map((skillId) => ({
    UserId: userId,
    SkillId: skillId,
  }));
  return await UserSkills.bulkCreate(userSkills);
};

const getAllApplicationsOfUser = async (id) => {
 return await User.findByPk(id, {
    attributes:[],
    include: [
      {
        model: JobPost,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        through: {
          model: Application,
          attributes: ["status"],
        },
      },
    ],
  });
};

module.exports = {
  createJobseekerDb,
  findJobseekerDB,
  updateJobseekerDb,
  addEducationDB,
  addSkillsDb,
  getEducationDetailsDb,
  jobseekerDetailsDB,
  jobSeekerSkills,
  checkSkillDB,
  updateEducationDetailsDb,
  updateJobseekerSkillsDb,
  getAllApplicationsOfUser,
};
