const { Sequelize, DataTypes } = require("sequelize");
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const sequelize = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
const insertDefaultRoles = require("./users/model/insertDefaultData");
const insertDefaultSkills = require("./users/model/insertDefaultskills.js");
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
dataModel.RefreshToken = require("./auth/refreshToken.model")(
  sequelize,
  DataTypes
);
dataModel.Application = require("./users/model/application.model")(
  sequelize,
  DataTypes
);
dataModel.JobPost = require("./jobs/jobPost.model.js")(sequelize, DataTypes);
dataModel.Skill = require("./skills/skills.model.js")(sequelize, DataTypes);
dataModel.UserSkills = require("./users/model/userSkill.model")(
  sequelize,
  DataTypes
);
dataModel.JobSkills = require("./users/model/jobSkill.model")(
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
dataModel.User.hasMany(dataModel.UserRole);
dataModel.UserRole.belongsTo(dataModel.User);
dataModel.UserRole.belongsTo(dataModel.Role);
dataModel.Role.hasMany(dataModel.UserRole);

// =============== User-Skills:(many to many) ========================
dataModel.User.belongsToMany(dataModel.Skill, {
  through: dataModel.UserSkills,
});
dataModel.Skill.belongsToMany(dataModel.User, {
  through: dataModel.UserSkills,
});

// =============== Job-Skills:(many to many) ========================
dataModel.JobPost.belongsToMany(dataModel.Skill, {
  through: dataModel.JobSkills,
});
dataModel.Skill.belongsToMany(dataModel.JobPost, {
  through: dataModel.JobSkills,
});

// ================== User-Employer:(one to one )=================
dataModel.User.hasOne(dataModel.Employer, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  constraints: false,
  as: "Profession_Details",
});
dataModel.Employer.belongsTo(dataModel.User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  constraints: false,
});

// // ================== User-RefreshToken:(one to many )=============
dataModel.User.hasMany(dataModel.RefreshToken, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  constraints: false,
  as: "refreshToken",
});
dataModel.RefreshToken.belongsTo(dataModel.User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  constraints: false,
});

// =============== Company-Branch:(one to many) ========================
dataModel.Company.hasMany(dataModel.Branch, {
  foreignKey: {
    name: "companyId",
    allowNull: false,
  },
  constraints: false,
});
dataModel.Branch.belongsTo(dataModel.Company, {
  foreignKey: {
    name: "companyId",
    allowNull: false,
  },
  constraints: false,
});

// =============== CompanyAddress-Branch:(one to one) ==================
dataModel.CompanyAddress.hasOne(dataModel.Branch, {
  foreignKey: {
    name: "addressId",
    allowNull: false,
  },
  constraints: false,
});
dataModel.Branch.belongsTo(dataModel.CompanyAddress, {
  foreignKey: {
    name: "addressId",
    allowNull: false,
  },
  constraints: false,
});

// =============== Branch-Employer:(one to many) ========================
dataModel.Branch.hasMany(dataModel.Employer, {
  foreignKey: {
    name: "branchId",
    allowNull: false,
  },
  constraints: false,
});
dataModel.Employer.belongsTo(dataModel.Branch, {
  foreignKey: {
    name: "branchId",
    allowNull: false,
  },
  constraints: false,
});

// =============== Company-Employer:(one to many) ========================
dataModel.Company.hasMany(dataModel.Employer, {
  foreignKey: {
    name: "companyId",
    allowNull: false,
  },
  constraints: false,
});
dataModel.Employer.belongsTo(dataModel.Company, {
  foreignKey: {
    name: "companyId",
    allowNull: false,
  },
  constraints: false,
});

// ===============Employer-JobPost:(one to many) ========================
dataModel.Employer.hasMany(dataModel.JobPost, {
  foreignKey: {
    name: "empId",
  },
  constraints: false,
});
dataModel.JobPost.belongsTo(dataModel.Employer, {
  foreignKey: {
    name: "empId",
  },
  constraints: false,
});
// ===============JobPost-Application:(one to many) ========================
dataModel.JobPost.hasMany(dataModel.Application, {
  foreignKey: {
    name: "jobId",
  },
  constraints: false,
});

dataModel.Application.belongsTo(dataModel.JobPost, {
  foreignKey: {
    name: "jobId",
  },
  constraints: false,
});

// ===============User-Application:(one to many) ========================
dataModel.User.hasMany(dataModel.Application, {
  foreignKey: {
    name: "userId",
  },
  constraints: false,
});

dataModel.Application.belongsTo(dataModel.User, {
  foreignKey: {
    name: "userId",
  },
  constraints: false,
});

// ===============Skill-Application:(one to many) ========================
dataModel.Skill.hasMany(dataModel.Application, {
  foreignKey: {
    name: "skillId",
  },
  constraints: false,
});

dataModel.Application.belongsTo(dataModel.Skill, {
  foreignKey: {
    name: "skillId",
  },
  constraints: false,
});

const dbConnection = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await dataModel.sequelize.sync({ force: false });
    console.log("All models has been synchronized successfully.");
    await insertDefaultRoles(dataModel.Role);
    await insertDefaultSkills(dataModel.Skill);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { dbConnection, dataModel };
