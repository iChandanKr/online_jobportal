const EmployerService = require("../services/employer.services");
const responseObj = require('../../utils/response');
const registerEmployer = async (req, res) => {
  req.body.role = "employer";
  try {
    const createdEmployer = await EmployerService.createEmployerService(
      req.body
    );
    const { accessToken, refreshToken } = createdEmployer.dataValues;
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
  
    responseObj(res,201,"Employer Created successfully",createdEmployer);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Don't able to create Employer!!",
      error: err,
    });
  }
};

module.exports = {
  registerEmployer,
};
