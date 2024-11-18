const {
  createEmployerDb,
  updateEmployerDb,
  findEmployerDB,
  getApplicantBySearchDB,
} = require("../repo/employer.repo");
const { dataModel } = require("../../dbConnection");
const { sequelize } = dataModel;
const AuthService = require("../../auth/auth.services");
const { generateAccessToken } = require("../../utils/tokenGenerator");
const { search, sort, paginate } = require("../../utils/apiFeatures");
class EmployerService {
  static createEmployerService = async (employerData) => {
    const result = sequelize.transaction(async (t) => {
      const response = await createEmployerDb(employerData, t);
      delete response.dataValues.password;
      const userId = response.dataValues?.id;
      const refreshTokenDetails = await AuthService.createSessionService(
        userId
      );
      const accessToken = generateAccessToken(userId);
      response.dataValues.accessToken = accessToken;
      response.dataValues.refreshToken = refreshTokenDetails;
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
    const branch_details = JSON.parse(
      JSON.stringify(employer.Profession_Details.Company.Branches[0])
    );
    delete personal_details.Profession_Details;
    delete profession_details.Company;
    delete branch_details.CompanyAddress;
    const {
      line1,
      line2,
      city: companyCity,
      state: companyState,
      pincode: companyPincode,
      country: companyCountry,
    } = employer.Profession_Details.Company.Branches[0].CompanyAddress;

    const {
      name,
      companyIndustry,
      email: companyEmail,
      contact: companyContact,
      totalEmployees,
      foundedDate,
    } = employer.Profession_Details.Company;

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
      line1,
      line2,
      companyCity,
      companyState,
      companyPincode,
      companyCountry,
    };
    return sendResponse;
  };

  static getApplicantsService = async (req) => {
    let orderBy;
    const limit = req.query.limit || 5;
    let offset;
    if (req.query.sort) {
      orderBy = sort(req.query.sort);
    } else {
      orderBy = sort("-updatedAt");
    }
    if (req.query.page) {
      offset = paginate(req.query.page, limit);
    }

    let searchFields = req.query.search || `%`;
    searchFields = search(searchFields);

    const applicants = await getApplicantBySearchDB(
      searchFields,
      req.empId,
      orderBy,
      limit,
      offset
    );
    return applicants;
  };
}
module.exports = EmployerService;
