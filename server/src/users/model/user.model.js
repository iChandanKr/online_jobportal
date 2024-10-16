const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        validate: {
          notEmpty: {
            msg: "please Enter your Name",
          },
        },
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
      dob: {
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: {
            msg: "please Enter your DOB",
          },
        },
        allowNull: false,
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
            msg: "please Enter your Name",
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
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter your City",
          },
        },
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter your State",
          },
        },
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
        validate: {
          notEmpty: {
            msg: "please Enter your Country",
          },
        },
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "user",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
          user.confirmPassword = undefined;
        },

        beforeUpdate: async (user) => {
          if (await user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
            user.passwordChangedAt = Date.now();
          }
        },
        afterUpdate: async (user) => {
          user.confirmPassword = undefined;
        },
      },
    }
  );
  user.prototype.comparePassword = async function (password, storedPassword) {
    return await bcrypt.compare(password, storedPassword);
  };
  user.prototype.isPasswordChanged = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const passwordChangedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < passwordChangedTimestamp;
    }
    return false;
  };
  return user;
};
