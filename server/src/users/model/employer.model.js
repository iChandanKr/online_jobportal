// const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const employer = sequelize.define(
    "Employer",
    {
      employerId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      department: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      branchId: {
        type: DataTypes.UUID,
      },
      companyId: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: "employer",
    }
  );
  return employer;
};
