const CustomError = require('../../utils/customError');
const AuthService = require('../auth.services');
const {generateAccessToken} = require('../../utils/tokenGenerator');
module.exports = async(sequelize,id,next)=>{
    let result;
  let accessToken;

  try {
    result = await sequelize.transaction(async (t) => {
      await AuthService.createSessionService(id, t);
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
  if (result) {
    accessToken = generateAccessToken(id);
  }
  console.log(result)
  return {result,accessToken};
}