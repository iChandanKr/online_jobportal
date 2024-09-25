const EmployerService = require("../services/employer.services");

const registerEmployer = async (req, res) => {
  req.body.role = "employer";
  try {
    const createdEmployer = await EmployerService.createEmployerService(
      req.body
    );
    res.status(201).json({
      status: "success",
      message: "Employer Created successfully",
      data: createdEmployer,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Don't able to create Employer!!",
      error: err,
    });
  }
};

module.exports = {
  registerEmployer,
};
