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
    // const personal_details = {
    //   ...employer,
    //   ...employer.personal_details,
    //   ...employer.Profession_Details.Company,
    // };
    // delete employer.Profession_Details;
    const personal_details = employer.dataValues;
    console.log(Object.keys(personal_details));
    console.log(
      employer.Profession_Details.Company.Branches[0].CompanyAddress,
      "dataaaaaaaa"
    );

    // console.log(employer);
    return employer;
  };
}
module.exports = EmployerService;
