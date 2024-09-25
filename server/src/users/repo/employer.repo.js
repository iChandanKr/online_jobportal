const { dataModel } = require("../../dbConnection");
const { Company, Employer, CompanyAddress, Branch, Role, UserRole, sequelize } =
  dataModel;

const createEmployerDb = async (employerData) => {
  let roleId;
  let result;
  try {
    result = await sequelize.transaction(async (t) => {
      const existingRole = await Role.findOne({
        where: { role: employerData.role },
      });
      if (!existingRole) {
        const res = await Role.create(
          { role: employerData.role },
          { transaction: t }
        );
        roleId = res.dataValues.id;
      } else {
        roleId = existingRole.dataValues.id;
      }
      const newCompany = await Company.create(
        {
          name: employerData.companyName,
          companyIndustry: employerData.companyIndustry,
          email: employerData.companyEmail,
          contact: employerData.companyContact,
        },
        { transaction: t }
      );
      const address = await CompanyAddress.create(
        {
          line1: employerData.addressLine1,
          line2: employerData.addressLine2,
          city: employerData.city,
          state: employerData.state,
          pincode: employerData.pincode,
          country: employerData.country,
        },
        {
          transaction: t,
        }
      );
      const branch = await Branch.create({
        companyId: newCompany.dataValues.id,
        addressId: address.dataValues.id,
        branchName: employerData.branchName,
      });
      const newEmployer = await Employer.create(
        {
          firstName: employerData.firstName,
          lastName: employerData.lastName,
          email: employerData.email,
          password: employerData.password,
          confirmPassword: employerData.confirmPassword,
          contact: employerData.contact,
          department: employerData.department,
          designation: employerData.designation,
          branchId: branch.dataValues.id,
        },
        {
          transaction: t,
        }
      );
      await UserRole.create(
        { userId: newEmployer.dataValues.id, roleId },
        { transaction: t }
      );
      return newEmployer;
    });
  } catch (error) {
    throw error.message;
  }
  return result;
};
module.exports = {
  createEmployerDb,
};
