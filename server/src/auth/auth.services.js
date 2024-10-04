const {
  createSessionDB,
  findUserByEmail,
  roleDetails,
  verifyUserRoleDB,
  findUserById,
  stopSessionDB,
} = require("./auth.repo");
const {
  generateRefreshToken,
  // generateAccessToken,
} = require("../utils/tokenGenerator");
const CustomError = require("../utils/customError");
class AuthService {
  static loginService = async (req, inputDetails) => {
    const { email, password, role } = inputDetails;
    if (!email || !password || !role) {
      throw new CustomError(
        "Please Enter Email, Password & role to login!",
        400
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

          if (verifyUserRole) {
            // set user role to request after login successful;
            req.userRole = userRoleDetails.dataValues?.role;
            return { userId: user.dataValues?.id };
          } else {
            throw new CustomError(
              "You don't have permission to login through entered role ",
              403
            );
          }
        } else {
          new CustomError("Pleae Enter the correct credentials...", 400);
        }
      } else {
        throw new CustomError("Invalid login credentials", 400);
      }
    } else {
      throw new CustomError("Invalid login credentials", 400);
    }
  };

  //  logout service
  static logoutService = async (req, res) => {
    const { user, currentRefreshToken: refreshToken } = req;
    const userDetails = await findUserById(user.id);
    const ans = await stopSessionDB(userDetails.dataValues?.id, refreshToken);
    if (ans >= 1) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return ans;
    } else {
      throw new CustomError("You are not loggedIn", 400);
    }
  };

  static createSessionService = async (user_id, t) => {
    // const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);
    
    return await createSessionDB(user_id, refreshToken, t);
  };
}
module.exports = AuthService;
