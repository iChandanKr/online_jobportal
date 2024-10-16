const EmployerService = require("../services/employer.services");
const { respondOk } = require("../../utils/apiResponse");
const registerEmployer = async (req, res, next) => {
  req.body.role = "employer";
  try {
    const createdEmployer = await EmployerService.createEmployerService(
      req.body
    );
    const { accessToken, refreshToken } = createdEmployer.dataValues;
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    respondOk(res, 201, "Employer Created successfully", createdEmployer);
  } catch (err) {
    next(err);
  }
};

const updateEmployer = async (req, res, next) => {
  try {
    const id = req.user.id;
    const employersData = req.body;

    const updatedEmployerData = await EmployerService.updateEmployerService(
      id,
      employersData
    );
    const employerResponse = updatedEmployerData.toJSON();
    delete employerResponse.password;
    respondOk(res, 200, "Employer updated successfully", employerResponse);
  } catch (error) {
    next(error);
  }
};

const getSpecificEmployeer = async (req, res, next) => {
  try {
    const employer = await EmployerService.findEmployerService(req.user.id);
    respondOk(res, 200, "Here is the Employer Details", employer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerEmployer,
  updateEmployer,
  getSpecificEmployeer,
};
