const {
  createSessionDB,
  findUserByEmail,
  roleDetails,
  verifyUserRoleDB,
} = require("./auth.repo");
const {
  generateRefreshToken,
  // generateAccessToken,
} = require("../utils/tokenGenerator");
const CustomError = require("../utils/customError");
class AuthService {
  static loginService = async (req, inputDetails, next) => {
    const { email, password, role } = inputDetails;
    if (!email || !password) {
      return next(
        new CustomError("Please Enter Email and Password to login!", 400)
      );
    }
    // check if user exists
    const user = await findUserByEmail(email);
    if (user) {
      const isPasswordMatched = await user.comparePassword(
        password,
        user.dataValues?.password
      );
      if (isPasswordMatched) {
        const userRoleDetails = await roleDetails(role);
        if (userRoleDetails) {
          const verifyUserRole = await verifyUserRoleDB(
            userRoleDetails.dataValues?.id,
            user.dataValues?.id
          );
          console.log(verifyUserRole);
          
          if (verifyUserRole) {
            req.userRole = userRoleDetails.dataValues?.role;
            return { userId: user.dataValues?.id };
          } else {
            return next(
              new CustomError(
                "You don't have permission to login through entered role ",
                403
              )
            );
          }
        } else {
          return next(
            new CustomError("Pleae Enter the correct credentials...", 400)
          );
        }
      } else {
        return next(new CustomError("Invalid login credentials", 400));
      }
    } else {
      return next(new CustomError("Invalid login credentials", 400));
    }
  };

  static createSessionService = async (user_id, t) => {
    // const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);
    return await createSessionDB(user_id, refreshToken, t);
  };
}
module.exports = AuthService;
