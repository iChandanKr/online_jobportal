const { dataModel } = require("../../dbConnection");
const { CustomError } = require("../../utils/apiResponse");
const { Company, Employer, User, CompanyAddress, Branch, Role, UserRole } =
  dataModel;

const createEmployerDb = async (employerData, t) => {
  const role = await Role.findOne({
    where: { role: employerData.role },
  });
  const newCompany = await Company.create(
    {
      name: employerData.companyName,
      companyIndustry: employerData.companyIndustry,
      email: employerData.companyEmail,
      contact: employerData.companyContact,
      totalEmployees: employerData.totalEmployees,
      foundedDate: employerData.foundedDate,
    },
    { transaction: t }
  );
  const address = await CompanyAddress.create(
    {
      line1: employerData.addressLine1,
      line2: employerData.addressLine2,
      city: employerData.companyCity,
      state: employerData.companyState,
      pincode: employerData.companyPincode,
      country: employerData.companyCountry,
    },
    {
      transaction: t,
    }
  );
  const branch = await Branch.create(
    {
      companyId: newCompany.dataValues.id,
      addressId: address.dataValues.id,
      branchName: employerData.branchName,
    },
    {
      transaction: t,
    }
  );
  const newEmployer = await User.create(
    {
      firstName: employerData.firstName,
      lastName: employerData.lastName,
      email: employerData.email,
      dob: employerData.dob,
      password: employerData.password,
      confirmPassword: employerData.confirmPassword,
      contact: employerData.contact,
      city: employerData.city,
      pinCode: employerData.pinCode,
      state: employerData.state,
      country: employerData.country,
      Profession_Details: {
        department: employerData.department,
        designation: employerData.designation,
        branchId: branch.dataValues?.id,
        companyId: newCompany.dataValues?.id,
      },
    },
    {
      include: [
        {
          model: Employer,
          as: "Profession_Details",
        },
      ],
      transaction: t,
    }
  );

  await UserRole.create(
    { UserId: newEmployer.dataValues?.id, RoleId: role.dataValues?.id },
    { transaction: t }
  );

  return newEmployer;
};

const updateEmployerDb = async (id, employerData, t) => {
  const employer = await User.findOne({
    where: { id },
    transaction: t,
  });

  if (!employer) {
    throw new CustomError("Employer not found", 404);
  }

  await employer.update(
    {
      firstName: employerData.firstName,
      lastName: employerData.lastName,
      email: employerData.email,
      dob: employerData.dob,
      contact: employerData.contact,
      city: employerData.city,
      pinCode: employerData.pinCode,
      state: employerData.state,
      country: employerData.country,
    },
    {
      validate: true,
      transaction: t,
    }
  );

  const professionDetails = await Employer.findOne({
    where: { userId: employer.id },
    transaction: t,
  });
  await professionDetails.update(
    {
      department: employerData.department,
      designation: employerData.designation,
    },
    { transaction: t }
  );

  const company = await Company.findOne({
    where: { id: professionDetails.companyId },
    transaction: t,
  });

  await company.update(
    {
      name: employerData.name,
      companyIndustry: employerData.companyIndustry,
      email: employerData.companyEmail,
      contact: employerData.companyContact,
      totalEmployees: employerData.totalEmployees,
      foundedDate: employerData.foundedDate,
    },
    { transaction: t, validate: true }
  );

  const branch = await Branch.findOne({
    where: { id: professionDetails.branchId },
    transaction: t,
  });
  await branch.update(
    {
      branchName: employerData.branchName,
    },
    { transaction: t }
  );

  const address = await CompanyAddress.findOne({
    where: { id: branch.addressId },
    transaction: t,
  });

  await address.update(
    {
      line1: employerData.line1,
      line2: employerData.line2,
      city: employerData.companyCity,
      state: employerData.companyState,
      pincode: employerData.companyPincode,
      country: employerData.companyCountry,
    },
    { transaction: t }
  );
  return employer;
};

const findEmployerDB = async (userId) => {
  return await User.findOne({
    where: { id: userId },
    attributes: {
      exclude: [
        "id",
        "password",
        "createdAt",
        "updatedAt",
        "passwordChangedAt",
      ],
    },
    include: [
      {
        model: Employer,
        as: "Profession_Details",

        attributes: {
          exclude: [
            "empId",
            "branchId",
            "userId",
            "companyId",
            "createdAt",
            "updatedAt",
          ],
        },
        include: [
          {
            model: Company,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
            include: [
              {
                model: Branch,
                attributes: {
                  exclude: [
                    "id",
                    "createdAt",
                    "updatedAt",
                    "addressId",
                    "companyId",
                  ],
                },
                include: [
                  {
                    model: CompanyAddress,
                    attributes: {
                      exclude: ["id", "createdAt", "updatedAt"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
};

module.exports = {
  createEmployerDb,
  updateEmployerDb,
  findEmployerDB,
};
