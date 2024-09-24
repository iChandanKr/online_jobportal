// -------- JOINING TABLE OF ROLE AND USERS----------------
const User = require("./users.model");
const Role = require("./usersRole.model");
module.exports = (sequelize, DataTypes) => {  
  const userRole = sequelize.define(
    "UserRole",
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      RoleId: {
        type: DataTypes.INTEGER,
        references: {
          model: Role,
          key: "id",
        },
      },
    },
    {
      tableName: "userRole",
    }
  );

  return userRole;
};
