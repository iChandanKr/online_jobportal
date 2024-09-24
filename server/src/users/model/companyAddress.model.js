const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const companyAddress = sequelize.define(
    "CompanyAddress",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      line1: {
        type: DataTypes.STRING(100),
        allowNull: false,
        set(value) {
          this.setDataValue("line1", value?.trim());
        },
      },
      line2: {
        type: DataTypes.STRING(150),    
        set(value) {
          this.setDataValue("line2", value?.trim());
        },
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      pinCode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        isNumeric: {
          args: true,
          msg: "Pincode must be numeric",
        },
        validate: {
          len: {
            args: [6, 6],
            msg: "Pincode must have exactly 6 digits",
          },
        },
      },
      country: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
    },
    {
      tableName: "companyAddress",
    }
  );
  return companyAddress;
};