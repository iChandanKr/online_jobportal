const {
  createSessionDB,
  findUserByEmail,
  roleDetails,
  verifyUserRoleDB,
  findUserById,
  stopSessionDB,
  findRefreshTokenDb,
  updatePasswordDB,
  updateLockedStatus,
} = require("./auth.repo");
const { redis } = require("../dbConnection");
const {
  generateRefreshToken,
  // generateAccessToken,
} = require("../utils/tokenGenerator");
const { CustomError } = require("../utils/apiResponse");
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
        if (req.failedAttempts !== 0) {
          await redis.del(`failed_attempts:${user.email}`);
          if (user.is_locked) {
            await updateLockedStatus(user.id, false);
          }
        }
        const userRoleDetails = await roleDetails(role);
        if (userRoleDetails) {
          const verifyUserRole = await verifyUserRoleDB(
            userRoleDetails.dataValues?.id,
            user.dataValues?.id
          );

          if (verifyUserRole) {
            // set user role to request after login successful;
            req.userRole = userRoleDetails.dataValues?.role;
            delete user.dataValues?.password;
            delete user.dataValues?.passwordChangedAt;
            delete user.dataValues?.createdAt;
            delete user.dataValues?.updatedAt;
            user.dataValues.role = req.userRole;
            return user.dataValues;
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
        let failedAttempts = req.failedAttempts;

        const maxFailedAttempts = parseInt(process.env.MAX_FAILED_ATTEMPTS);
        failedAttempts += 1;

        if (failedAttempts === 1) {
          await redis.setex(
            `failed_attempts:${email}`,
            parseInt(process.env.LOCKOUT_TIME),
            failedAttempts
          );
        } else {
          await redis.incr(`failed_attempts:${email}`);
        }

        if (failedAttempts === maxFailedAttempts) {
          await updateLockedStatus(user.id, true);

          throw new CustomError(
            `Oops, you are locked out, please try after ${Math.floor(
              parseInt(process.env.LOCKOUT_TIME) / 60
            )} minutes.`,
            403
          );
        }
        throw new CustomError(
          `Please Enter the correct credentials. Attempts remaining:${
            maxFailedAttempts - failedAttempts
          }`,
          400
        );
      }
    } else {
      throw new CustomError("Invalid login credentials", 400);
    }
  };

  //  logout service
  static logoutService = async (req, res) => {
    const { user } = req;
    const userDetails = await findUserById(user.id);
    const deleteCount = await stopSessionDB(userDetails.dataValues?.id);
    if (deleteCount >= 1) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return deleteCount;
    } else {
      throw new CustomError("You are not loggedIn", 400);
    }
  };
  static findRefreshTokenService = async (refreshToken, userId) =>
    await findRefreshTokenDb(refreshToken, userId);

  static deleteRefreshTokenService = async (id) => await stopSessionDB(id);

  static createSessionService = async (user_id) => {
    const refreshToken = generateRefreshToken(user_id);

    return await createSessionDB(user_id, refreshToken);
  };

  static updatePasswordService = async (req, res) => {
    const user = req.user;
    const userInfo = await findUserById(user.id);
    const { password, newPassword, confirmPassword } = req.body;
    const isValidPassword = await userInfo.comparePassword(
      password,
      userInfo.password
    );
    if (!isValidPassword) {
      throw new CustomError("You have entered wrong password", 400);
    }
    if (newPassword !== confirmPassword) {
      throw new CustomError(
        "New password and confirm password doesn't match",
        400
      );
    }
    const updatedRes = await updatePasswordDB(userInfo.id, newPassword);
    if (updatedRes) {
      // stop all the sessions associated with this user
      await stopSessionDB(userInfo.id);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
    }
    return updatedRes;
  };
}
module.exports = AuthService;
