"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("company", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(150),
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
        type: Sequelize.STRING(100),
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
        type: Sequelize.STRING(205),
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
      totalEmployees: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: {
          msg: "Please Enter Total Employees ",
        },
      },
      foundedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        notEmpty: {
          msg: "Please Enter Company Foundation Date",
        },
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
    await queryInterface.dropTable("company");
  },
};
