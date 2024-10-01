const createSessionDB = require("./auth.repo");
const {
  
  generateRefreshToken,
} = require("../utils/tokenGenerator");
class AuthService {
  static createSessionService = async (user_id, t) => {
    // const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);
    
    return await createSessionDB(user_id, refreshToken, t);
  };
}
module.exports = AuthService;
