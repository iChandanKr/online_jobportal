// -------- JOINING TABLE OF ROLE AND USERS----------------
// const Jobseeker = require("./jobseeker.model");
// const Role = require("./usersRole.model");
module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define(
    "UserRole",
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "userRole",
    }
  );

  return userRole;
};
