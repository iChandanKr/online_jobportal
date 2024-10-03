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
        validate: {
          notEmpty: {
            msg: "please Enter Company Name",
          },
        },
        unique: true,
        set(value) {
          this.setDataValue("name", value?.trim());
        },
      },
      companyIndustry: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter Company Industry",
          },
        },
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
          notEmpty: {
            msg: "please Enter Email",
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
      totalEmployees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        notEmpty: {
          msg: "Please Enter Total Employees ",
        },
      },
      foundedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        notEmpty: {
          msg: "Please Enter Company Foundation Date",
        },
      },
    },
    {
      tableName: "company",
    }
  );
  return company;
};
