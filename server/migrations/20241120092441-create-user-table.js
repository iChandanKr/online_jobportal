"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING(50),
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
        type: Sequelize.STRING(40),
        set(value) {
          this.setDataValue("lastName", value?.trim());
        },
      },
      dob: {
        type: Sequelize.DATEONLY,
        validate: {
          notEmpty: {
            msg: "please Enter your DOB",
          },
        },
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(205),
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
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "Password must be at least 8 characters long",
          },
        },
      },
      contact: {
        type: Sequelize.STRING(10),
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
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter your City",
          },
        },
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter your State",
          },
        },
      },
      pinCode: {
        type: Sequelize.STRING(6),
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
        type: Sequelize.STRING(70),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter your Country",
          },
        },
      },
      passwordChangedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user");
  },
};
