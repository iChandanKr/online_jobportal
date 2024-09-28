// -------- JOINING TABLE OF ROLE AND USERS----------------
const User = require("./user.model");
const Role = require("./userRole.model");
module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define(
    "UserRole",
    {
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },

      RoleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Role,
          key: "id",
        },
      },
    },
    {
      tableName: "userRole",
      timestamps: false,
    }
  );

  return userRole;
};
