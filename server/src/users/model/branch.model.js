const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const branch = sequelize.define(
    "Branch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      address_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      branchName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        set(value) {
          this.setDataValue("branchName", value?.trim());
        },
      },
    },
    {
      tableName: "branch",
    }
  );
  return branch;
};