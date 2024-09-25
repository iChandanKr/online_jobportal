const { dataModel } = require("../../dbConnection");
const { Jobseeker, Role, UserRole, sequelize } = dataModel;

const createJobseekerDb = async (JobseekerData) => {
  let roleId;
  let result;
  try {
    result = await sequelize.transaction(async (t) => {
      const existingRole = await Role.findOne({
        where: { role: JobseekerData.role },
      });
      if (!existingRole) {
        const res = await Role.create(JobseekerData.role, { transaction: t });
        roleId = res.dataValues.id;
      } else {
        roleId = existingRole.dataValues.id;
      }
      const newJobseeker = await Jobseeker.create(JobseekerData, {
        transaction: t,
      });
      await UserRole.create(
        { userId: newJobseeker.dataValues.id, roleId },
        { transaction: t }
      );
      return newJobseeker;
    });
  } catch (error) {
    throw error.message;
  }
  return result;
};
module.exports = {
  createJobseekerDb,
};
