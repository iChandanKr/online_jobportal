const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const employer = sequelize.define(
    "Employer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        set(value) {
          this.setDataValue("firstName", value?.trim());
        },
      },
      lastName: {
        type: DataTypes.STRING(40),
        set(value) {
          this.setDataValue("lastName", value?.trim());
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
      password: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "Password must be at least 8 characters long",
          },
        },
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          isConfirmed(value) {
            if (this.password !== value) {
              throw new Error("Password and Confirm Password does not match!");
            }
          },
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
      department: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
    },
    {
      tableName: "employer",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          user.confirmPassword = undefined;
        },
      },
    }
  );
  return employer;
};
