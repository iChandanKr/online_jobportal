const EmployerService = require("../services/employer.services");
const resObj = require("../../utils/response");
const registerEmployer = async (req, res, next) => {
  req.body.role = "employer";
  try {
    
    const createdEmployer = await EmployerService.createEmployerService(
      req.body
    );
    const { accessToken, refreshToken } = createdEmployer.dataValues;
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    resObj(res, 201, "Employer Created successfully", createdEmployer);
  } catch (err) {
    next(err);
  }
};

const updateEmployer=async(req,res)=>{
  try {
    const id=req.params.id
    const employersData=req.body

    const updatedEmployerData=await EmployerService.updateEmployerService(id,employersData)
    const employerResponse = updatedEmployerData.toJSON();
    resObj(res, 200, "Employer updated successfully", employerResponse);

  } catch (error) {
    resObj(res,500,"Error updating the employer",error)
  }
}

module.exports = {
  registerEmployer,
  updateEmployer
};
