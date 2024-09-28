module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define(
    "Company",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue("name", value?.trim());
        },
      },
      companyIndustry: {
        type: DataTypes.STRING(100),
        allowNull: false,
        set(value) {
          this.setDataValue("companyIndustry", value?.trim());
        },
      },
      email: {
        type: DataTypes.STRING(205),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address!",
          },
        },
        set(value) {
          this.setDataValue("email", value?.trim());
        },
      },
      contact: {
        type: DataTypes.STRING(10),
        allowNull: false,
        isNumeric: {
          args: true,
          msg: "Contact must be numeric",
        },
        validate: {
          len: { args: [10, 10], msg: "Contact must have exactly 10 digits" },
        },
      },
      totalEmployees:{
        type: DataTypes.INTEGER,
        allowNull:false
      }
    },
    {
      tableName: "company",
    }
  );
  return company;
};
