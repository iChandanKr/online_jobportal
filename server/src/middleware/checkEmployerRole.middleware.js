const { dataModel } = require('../dbConnection');
const { User, UserRole, Role } = dataModel; 
const CustomError = require('../utils/customError');

const checkEmployerRole = async (req, res, next) => {
  try {
    const empId = req.empId; 
    
    if (!empId) {
      return next(new CustomError("empId not provided in request", 400));
    }

    
    const employer = await User.findByPk(empId);
    if (!employer) {
      return next(new CustomError("User not found", 404));
    }
    
    
    const userRole = await UserRole.findOne({
      where: { UserId: empId },
      include: [{
        model: Role, 
        attributes: ['role'] 
      }]
    });

    if (!userRole || !userRole.Role) {
      return next(new CustomError("User role not found", 404));
    }

    const roleName = userRole.Role.role;

    
    if (roleName !== 'employer') {
      return next(new CustomError("Access denied: User is not an employer", 403));
    }

    
    req.empId = empId; 
    next();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = checkEmployerRole;
