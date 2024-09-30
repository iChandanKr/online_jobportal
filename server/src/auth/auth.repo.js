const { dataModel } = require('../dbConnection');
const { RefreshToken } = dataModel;

const createSessionDB = async (user_id, refreshToken, t) => {
 return await RefreshToken.create(
    { userId: user_id, refreshToken },
    {
      transaction: t,
    }
  );
};
module.exports = createSessionDB;
