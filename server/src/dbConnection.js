const { Sequelize, DataTypes } = require("sequelize");
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
const insertDefaultRoles = require('./users/model/insertDefaultData');
const dataModel = {};
dataModel.Sequelize = Sequelize;
dataModel.sequelize = sequelize;
dataModel.User = require("./users/model/user.model")(sequelize, DataTypes);
dataModel.Role = require("./users/model/role.model")(sequelize, DataTypes);
dataModel.UserRole = require("./users/model/userRole.model")(
  sequelize,
  DataTypes
);
dataModel.Company = require("./users/model/company.model")(
  sequelize,
  DataTypes
);
dataModel.Branch = require("./users/model/branch.model")(sequelize, DataTypes);
dataModel.CompanyAddress = require("./users/model/companyAddress.model")(
  sequelize,
  DataTypes
);
dataModel.Employer = require("./users/model/employer.model")(
  sequelize,
  DataTypes
);
// ----------- Relationships of models-------------------

// ================= User-Role:(many to many)===================
dataModel.User.belongsToMany(dataModel.Role, {
  through: dataModel.UserRole,
});
dataModel.Role.belongsToMany(dataModel.User, {
  through: dataModel.UserRole,
});
// =============== Company-Branch:(one to many) ==================
dataModel.Company.hasMany(dataModel.Branch, {
  foreignKey: "companyId",
  constraints: false,
});
dataModel.Branch.belongsTo(dataModel.Company, {
  foreignKey: "companyId",
  constraints: false,
});

// =============== CompanyAddress-Branch:(one to one) ==================
dataModel.CompanyAddress.hasOne(dataModel.Branch, {
  foreignKey: "addressId",
  constraints: false,
});
dataModel.Branch.belongsTo(dataModel.CompanyAddress, {
  foreignKey: "addressId",
  constraints: false,
});

// =============== Branch-Employer:(one to many) ========================
dataModel.Branch.hasMany(dataModel.Employer, {
  foreignKey: "branchId",
  constraints: false,
});
dataModel.Employer.belongsTo(dataModel.Branch, {
  foreignKey: "branchId",
  constraints: false,
});

const dbConnection = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await dataModel.sequelize.sync({ force: true });
    console.log("All models has been synchronized successfully.");
   await insertDefaultRoles(dataModel.Role);
  } catch (error) {
    console.error("Unable to coasasnnect to the database:", error);
  }
};
module.exports = { dbConnection, dataModel };
