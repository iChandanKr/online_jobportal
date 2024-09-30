const AuthService = require("./auth.services");
const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const CustomError = require("../utils/customError");
const { generateAccessToken } = require("../utils/tokenGenerator");
const createSession = async (req, res, next) => {
  let result;
  let accessToken;
  const id = req.body.id;

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
  res.status(201).json({
    status: "success",
    token: result,
    access: accessToken,
  });
};

module.exports = createSession;
