const { Sequelize, DataTypes } = require("sequelize");
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const dataModel = {};
dataModel.Sequelize = Sequelize;
dataModel.sequelize = sequelize;
dataModel.User = require("./users/model/users.model")(sequelize, DataTypes);
dataModel.Role = require("./users/model/usersRole.model")(sequelize, DataTypes);
dataModel.UserRole = require("./users/model/userRoleJoining.model")(
  sequelize,
  DataTypes
);
// ----------- Relationships of models-------------------

// ================= User-Role (:many to many)===================
dataModel.User.belongsToMany(dataModel.Role, { through: dataModel.UserRole });
dataModel.Role.belongsToMany(dataModel.User, { through: dataModel.UserRole });


const dbConnection = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await dataModel.sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to coasasnnect to the database:", error);
  }
};
module.exports = { dbConnection, dataModel };
