const {
  createEmployerDb,
  updateEmployerDb,
  findEmployerDB,
} = require("../repo/employer.repo");
const { dataModel } = require("../../dbConnection");
const { sequelize } = dataModel;
const AuthService = require("../../auth/auth.services");
const { generateAccessToken } = require("../../utils/tokenGenerator");
class EmployerService {
  static createEmployerService = async (employerData) => {
    const result = sequelize.transaction(async (t) => {
      const response = await createEmployerDb(employerData, t);
      delete response.dataValues.password;
      const userId = response.dataValues?.id;
      const refreshTokenDetails = await AuthService.createSessionService(
        userId,
        t
      );
      const accessToken = generateAccessToken(userId);
      response.dataValues.accessToken = accessToken;
      response.dataValues.refreshToken =
        refreshTokenDetails.dataValues?.refreshToken;
      return response;
    });

    return result;
  };

  static updateEmployerService = async (id, employerData, t) => {
    return await updateEmployerDb(id, employerData, t);
  };

  static findEmployerService = async (userId) => {
    const employer = await findEmployerDB(userId);
    const personal_details = JSON.parse(JSON.stringify(employer.dataValues));
    const profession_details = JSON.parse(
      JSON.stringify(employer.Profession_Details)
    );
    const company_details = JSON.parse(
      JSON.stringify(employer.Profession_Details.Company)
    );
    const branch_details = JSON.parse(
      JSON.stringify(employer.Profession_Details.Company.Branches[0])
    );
    const company_address = JSON.parse(
      JSON.stringify(
        employer.Profession_Details.Company.Branches[0].CompanyAddress
      )
    );

    delete personal_details.Profession_Details;
    delete profession_details.Company;
    delete company_details.Branches;
    delete branch_details.CompanyAddress;
    const {
      name,
      companyIndustry,
      email: companyEmail,
      contact: companyContact,
      totalEmployees,
      foundedDate,
    } = company_details;
    const sendResponse = {
      ...personal_details,
      ...profession_details,

      name,
      companyIndustry,
      companyEmail,
      companyContact,
      totalEmployees,
      foundedDate,
      ...branch_details,
      ...company_address,
    };
    console.log(sendResponse);
    return employer;
  };
}
module.exports = EmployerService;
